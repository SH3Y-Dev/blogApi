const express = require('express');
const router = express.Router();

const postController = require("../controller/post.controller");
const userController = require("../controller/user.controller");
const authController = require('../auth/auth');

router.get("/posts", postController.getAllPostsWithAuthors);
router.get("/posts/author", authController.authenticate, userController.getAllPostsOfUser);
router.post("/post", authController.authenticate, postController.createPost);

module.exports = router;