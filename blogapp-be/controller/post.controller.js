const Post = require('../model/Post.model');
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user._id;

    const newPost = await Post.create({ title, content, authorId });

    res.status(201).json({
      status: "success",
      data: newPost,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};


exports.getAllPostsWithAuthors = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("authorId", "firstname lastname email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

