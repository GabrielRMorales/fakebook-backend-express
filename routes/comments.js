const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//get all comments of a specific post
router.get("/post/:id", commentController.get_post_comments);

router.post("/comments/", commentController.post_comment);

router.put("/edit/:id", commentController.edit_comment);

router.delete("/delete/:id", commentController.delete_comment);

module.exports = router;