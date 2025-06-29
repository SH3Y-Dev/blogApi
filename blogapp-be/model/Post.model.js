const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A Blog Post must have a title"],
    },
    content: {
      type: String,
      required: [true, "A Blog Post must have a content"],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema);
module.exports = Post;