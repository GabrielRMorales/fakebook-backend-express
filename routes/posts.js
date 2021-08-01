const express = require("express");
const router = express.Router();
//import post controllers
const postController = require("../controllers/postController");

//there should be a way to get more posts for a specific user
router.get("/user/:id", postController.get_user_posts);

router.post("/new", postController.new_post);

router.put("/edit/:id", postController.edit_post);

router.delete("/delete/:id", postController.delete_post);

module.exports = router;