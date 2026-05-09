import { useState } from "react";

const LIMIT = 500;

const PostComposer = ({ onPost, loading }) => {
  const [content, setContent] = useState("");

  const handleShare = (event) => {
    event.preventDefault();
    if (!content.trim()) return;
    onPost(content.trim());
    setContent("");
  };

  return (
    <section id="share" className="px-4 py-8 sm:px-6">
      <div className="glass mx-auto max-w-3xl rounded-3xl p-5 sm:p-8">
        <h2 className="text-xl font-semibold text-indigo-100">Share anonymously</h2>
        <p className="mt-2 text-sm text-slate-300">Write what you cannot say aloud...</p>
        <form onSubmit={handleShare} className="mt-5">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value.slice(0, LIMIT))}
            placeholder="Write what you cannot say aloud..."
            rows={6}
            className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/50 px-4 py-3 text-slate-100 outline-none ring-indigo-300 transition focus:ring-2"
          />
          <div className="mt-2 text-right text-xs text-slate-400">{content.length}/{LIMIT}</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              disabled={loading}
              type="submit"
              className="rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sharing..." : "Share Anonymously"}
            </button>
            <button
              type="button"
              onClick={() => setContent("")}
              className="rounded-full border border-white/20 px-5 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostComposer;
