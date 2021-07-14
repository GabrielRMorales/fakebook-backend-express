const express = require("express");
const router = express.Router;
const commentController = require("../controllers/commentController");

router.post("/comments/", commentController.post_comment);

router.put("/comments/edit/:id", commentController.edit_comment);

router.delete("/comments/delete/:id", commentController.delete_comment);

module.exports = router;