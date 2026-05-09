import { motion } from "framer-motion";
import PostCard from "./PostCard";

const Feed = ({ posts, onLike, onComment, isPostingComment, loading }) => {
  return (
    <section id="feed" className="px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-semibold text-indigo-100">Public Feed</h2>
        <p className="mt-2 text-sm text-slate-300">Support each other with kindness and empathy.</p>
        {loading ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-300">
            Loading thoughts...
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-slate-300">
            Be the first to share your Awaaz.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <PostCard
                  post={post}
                  onLike={onLike}
                  onComment={onComment}
                  isPostingComment={isPostingComment}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Feed;
