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


exports.getPostsByAuthorId = async (req, res) => {
  try {
    const { author } = req.query;

    if (!author) {
      return res.status(400).json({
        status: "fail",
        message: "Please provide an author ID in the query string: ?author=userId",
      });
    }
    const posts = await Post.find({ authorId: author }).populate(
      "authorId",
      "firstname lastname email"
    );

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
