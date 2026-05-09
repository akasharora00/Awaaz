import { useState } from "react";
import { formatDistanceToNow } from "../utils/time";
import CommentBox from "./CommentBox";

const PostCard = ({ post, clientId, onLike, onComment, isPostingComment }) => {
  const [showComments, setShowComments] = useState(false);
  const isLiked = Boolean(clientId && post.likedBy?.includes(clientId));

  return (
    <article className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-indigo-200">Anonymous</span>
        <span>{formatDistanceToNow(post.createdAt)}</span>
      </div>
      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-200">{post.content}</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onLike(post._id)}
          className={`rounded-full border px-3 py-1.5 text-xs transition ${
            isLiked
              ? "border-indigo-300 bg-indigo-500/30 text-indigo-100"
              : "border-white/10 text-slate-200 hover:bg-white/10"
          }`}
        >
          {isLiked ? "💜 Supported" : "❤️ Support"} ({post.likes})
        </button>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-200 transition hover:bg-white/10"
        >
          💬 Comments ({post.comments?.length || 0})
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3">
          {(post.comments || []).map((comment) => (
            <div key={comment._id} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-sm text-slate-200">{comment.content}</p>
              <span className="mt-1 block text-xs text-slate-400">{formatDistanceToNow(comment.createdAt)}</span>
            </div>
          ))}
          <CommentBox onSubmit={(content) => onComment(post._id, content)} loading={isPostingComment} />
        </div>
      )}
    </article>
  );
};

export default PostCard;
