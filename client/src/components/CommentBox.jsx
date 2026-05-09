import { useState } from "react";

const CommentBox = ({ onSubmit, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    onSubmit(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <textarea
        rows={2}
        value={text}
        onChange={(event) => setText(event.target.value.slice(0, 250))}
        placeholder="Leave a supportive comment..."
        className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none ring-indigo-300 transition focus:ring-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-indigo-500/90 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Support"}
      </button>
    </form>
  );
};

export default CommentBox;
