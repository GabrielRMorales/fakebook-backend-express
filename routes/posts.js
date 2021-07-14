const express = require("express");
const router = express.Router;
//import post controllers
const postController = require("../controllers/postController");


router.post("/post", postController.new_post);

router.put("/post/edit/:id", postController.edit_post);

router.delete("/post/delete/:id", postController.delete_post);