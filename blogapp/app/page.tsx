"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    email: string;
  };
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await api.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`);
        setPosts(res.data.data);
      } catch (err) {
        toast.error("Failed to load posts");
        console.error(err);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">All Blog Posts</h1>

      <div className="grid gap-6">
        {posts.length === 0 && (
          <p className="text-gray-500">No posts available.</p>
        )}
        {posts.map((post) => (
          <div
            key={post._id}
            className="border border-gray-300 rounded-lg p-5 shadow-sm bg-white"
          >
            <h2 className="text-xl text-black font-bold mb-2">{post.title}</h2>
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted by: {post.authorId?.email || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
