import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { isSupportiveComment } from "../utils/moderation.js";
import mongoose from "mongoose";

let ioInstance;

export const setSocketInstance = (io) => {
  ioInstance = io;
};

const logRequest = (label, meta) => {
  // eslint-disable-next-line no-console
  console.log(`[postController] ${label}`, meta);
};

const logError = (label, error, meta = {}) => {
  // eslint-disable-next-line no-console
  console.error(`[postController] ${label}`, {
    message: error?.message,
    stack: error?.stack,
    ...meta
  });
};

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

const extractContentField = (body) => {
  if (!body || typeof body !== "object") return "";
  const candidates = [body.content, body.message, body.text, body.post];
  const firstString = candidates.find((value) => typeof value === "string");
  return firstString || "";
};

const buildPostWithComments = async (postDocOrObj) => {
  const postId = postDocOrObj?._id;
  const comments = await Comment.find({ postId }).sort({ createdAt: -1 }).lean();
  const post = typeof postDocOrObj.toObject === "function" ? postDocOrObj.toObject() : postDocOrObj;
  return { ...post, comments };
};

const getClientId = (req) => {
  const rawId = req.headers["x-awaaz-client-id"];
  if (typeof rawId !== "string") return "";
  return rawId.trim().slice(0, 120);
};

export const getPosts = async (_req, res) => {
  try {
    logRequest("GET /api/posts - start", {});
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    const postIds = posts.map((post) => post._id);
    const comments = await Comment.find({ postId: { $in: postIds } }).sort({ createdAt: -1 }).lean();
    const commentsByPostId = comments.reduce((acc, comment) => {
      const key = String(comment.postId);
      if (!acc[key]) acc[key] = [];
      acc[key].push(comment);
      return acc;
    }, {});
    const mergedPosts = posts.map((post) => ({
      ...post,
      comments: commentsByPostId[String(post._id)] || []
    }));
    logRequest("GET /api/posts - success", { count: mergedPosts.length });
    return res.status(200).json({
      success: true,
      message: "Posts loaded successfully.",
      posts: mergedPosts
    });
  } catch (error) {
    logError("GET /api/posts - failure", error);
    return res.status(500).json({
      success: false,
      message: "Unable to load posts."
    });
  }
};

export const createPost = async (req, res) => {
  try {
    logRequest("POST /api/posts - start", {
      hasBody: Boolean(req.body),
      contentType: req.headers["content-type"],
      bodyKeys: Object.keys(req.body || {})
    });

    const extractedContent = extractContentField(req.body);
    if (typeof extractedContent !== "string") {
      return res.status(400).json({
        success: false,
        message: "Post content must be a string.",
        expected: "content",
        acceptedFields: ["content", "message", "text", "post"]
      });
    }
    const trimmedContent = extractedContent.trim();
    if (!trimmedContent) {
      return res.status(400).json({
        success: false,
        message: "Post content is required.",
        expected: "content",
        acceptedFields: ["content", "message", "text", "post"]
      });
    }
    if (trimmedContent.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Post must be 500 characters or less."
      });
    }

    const createdPost = await Post.create({ content: trimmedContent, likes: 0, likedBy: [] });
    const payload = { ...createdPost.toObject(), comments: [] };
    ioInstance?.emit("post:created", payload);
    logRequest("POST /api/posts - success", { postId: createdPost._id.toString() });
    return res.status(201).json({
      success: true,
      message: "Post shared anonymously.",
      post: payload
    });
  } catch (error) {
    logError("POST /api/posts - failure", error, { body: req.body });
    return res.status(500).json({
      success: false,
      message: "Could not create post.",
      error: error?.message
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const clientId = getClientId(req);
    logRequest("PATCH /api/posts/:id/like - start", { id, hasClientId: Boolean(clientId) });
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id."
      });
    }
    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "Missing client id for like toggle."
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found."
      });
    }

    const alreadyLiked = post.likedBy.includes(clientId);
    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter((item) => item !== clientId);
      post.likes = Math.max(0, post.likes - 1);
    } else {
      post.likedBy.push(clientId);
      post.likes += 1;
    }
    await post.save();

    const payload = await buildPostWithComments(post);
    ioInstance?.emit("post:updated", payload);
    logRequest("PATCH /api/posts/:id/like - success", {
      id,
      likes: payload.likes,
      liked: !alreadyLiked
    });
    return res.status(200).json({
      success: true,
      message: alreadyLiked ? "Support removed." : "Support sent.",
      liked: !alreadyLiked,
      likes: payload.likes,
      post: payload
    });
  } catch (error) {
    logError("PATCH /api/posts/:id/like - failure", error, { id: req.params.id });
    return res.status(500).json({
      success: false,
      message: "Could not update support."
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    logRequest("POST /api/posts/:id/comments - start", { id, hasBody: Boolean(req.body) });
    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post id."
      });
    }

    const { content } = req.body;
    if (typeof content !== "string") {
      return res.status(400).json({
        success: false,
        message: "Comment content must be a string."
      });
    }
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return res.status(400).json({
        success: false,
        message: "Comment content is required."
      });
    }
    if (trimmedContent.length > 250) {
      return res.status(400).json({
        success: false,
        message: "Comment must be 250 characters or less."
      });
    }
    if (!isSupportiveComment(trimmedContent)) {
      return res.status(400).json({
        success: false,
        message: "Please keep comments positive and supportive."
      });
    }

    const post = await Post.findById(id).lean();
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found."
      });
    }

    await Comment.create({
      postId: post._id,
      content: trimmedContent
    });
    const payload = await buildPostWithComments(post);

    ioInstance?.emit("post:updated", payload);
    logRequest("POST /api/posts/:id/comments - success", { id });
    return res.status(201).json({
      success: true,
      message: "Supportive comment added.",
      post: payload
    });
  } catch (error) {
    logError("POST /api/posts/:id/comments - failure", error, {
      id: req.params.id,
      body: req.body
    });
    return res.status(500).json({
      success: false,
      message: "Could not add comment."
    });
  }
};
