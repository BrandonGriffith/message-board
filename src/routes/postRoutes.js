const express = require("express");
const {auth, isPostOwner} = require("../middleware/authMiddleware");
const postController = require("../controllers/postController");
const router = express.Router();


router.route("/").get(auth, postController.getAllPosts).post(auth, postController.createPost);
router.route("/:id").get(auth, postController.getOnePost).put(auth, postController.updatePost).delete(auth, isPostOwner, postController.deletePost);


module.exports = router;