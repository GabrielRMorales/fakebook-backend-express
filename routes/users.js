const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//get one user-such as from users list or own user settings
router.get("/:id",userController.user_get);

//get all users (except for current user)-to see who can be friended
router.get("/users", userController.users_get);

//routes for editing user settings (ie edit password)

module.exports = router;