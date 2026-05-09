import { Router } from "express";
import { addComment, createPost, getPosts, likePost } from "../controllers/postController.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id/like", likePost);
router.post("/:id/comments", addComment);

export default router;
