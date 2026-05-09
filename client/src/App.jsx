import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PostComposer from "./components/PostComposer";
import Feed from "./components/Feed";
import EmergencyBanner from "./components/EmergencyBanner";
import Footer from "./components/Footer";
import api from "./services/api";
import { useSocket } from "./hooks/useSocket";

const distressKeywords = [
  "suicide",
  "kill myself",
  "self harm",
  "depressed",
  "depression",
  "end my life",
  "hopeless"
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [commenting, setCommenting] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const socket = useSocket();

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data.posts || []);
    } catch (error) {
      toast.error("Unable to load feed right now.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("post:created", (newPost) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    socket.on("post:updated", (updatedPost) => {
      setPosts((prev) => prev.map((item) => (item._id === updatedPost._id ? updatedPost : item)));
    });

    return () => {
      socket.off("post:created");
      socket.off("post:updated");
    };
  }, [socket]);

  const checkEmergency = (content) => {
    const text = content.toLowerCase();
    return distressKeywords.some((word) => text.includes(word));
  };

  const handlePost = async (content) => {
    try {
      setPosting(true);
      await api.post("/posts", { content });
      toast.success("Your voice was shared anonymously.");
      if (checkEmergency(content)) {
        setShowEmergency(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not share your post.");
    } finally {
      setPosting(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      await api.patch(`/posts/${postId}/like`);
    } catch (error) {
      toast.error("Unable to add support right now.");
    }
  };

  const handleComment = async (postId, content) => {
    try {
      setCommenting(true);
      const { data } = await api.post(`/posts/${postId}/comments`, { content });
      toast.success(data.message || "Supportive comment posted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Comment rejected.");
    } finally {
      setCommenting(false);
    }
  };

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [posts]
  );

  return (
    <div>
      <Navbar />
      <Hero />
      <PostComposer onPost={handlePost} loading={posting} />
      <Feed
        posts={sortedPosts}
        onLike={handleLike}
        onComment={handleComment}
        isPostingComment={commenting}
        loading={loading}
      />
      <Footer />
      <EmergencyBanner show={showEmergency} onClose={() => setShowEmergency(false)} />
    </div>
  );
};

export default App;
