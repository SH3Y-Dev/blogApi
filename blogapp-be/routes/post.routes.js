const express = require('express');
const router = express.Router();

const postController = require("../controller/post.controller");
const userController = require("../controller/user.controller");
const authController = require('../auth/auth');

router.get("/posts", authController.authenticate, userController.getAllPostsOfUser);
router.get("/posts/author", authController.authenticate, postController.getPostsByAuthorId);
router.post("/post", authController.authenticate, postController.createPost);

module.exports = router;
