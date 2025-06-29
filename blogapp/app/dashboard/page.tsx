"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPosts = async () => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/author`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        toast.error("Unauthorized. Please login.");
        Cookies.remove("token");
        localStorage.removeItem("userEmail");
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (data.status === "success") {
        setPosts(data.posts);
      }

      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch posts");
    }
  };

  const handlePost = async () => {
    if (!title.trim() || !content.trim()) return toast.error("Fill all fields");

    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (res.status === 401) {
        toast.error("Session expired. Login again.");
        Cookies.remove("token");
        localStorage.removeItem("userEmail");
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (data.status === "success") {
        toast.success("Post created");
        setTitle("");
        setContent("");
        fetchPosts();
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      toast.error("Error while posting");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-10">
        <h2 className="text-xl text-black font-semibold mb-4">Create a New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 mb-4 border text-black rounded-md"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 mb-4 border text-black rounded-md"
          rows={5}
        />
        <button
          onClick={handlePost}
          className="bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border border-black"
        >
          Add Post
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post: any) => (
              <div
                key={post._id}
                className="bg-white p-5 rounded-lg shadow border border-gray-200"
              >
                <h3 className="text-lg text-black font-bold mb-2">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
