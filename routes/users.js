const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/user/register", userController.register_post);
//use more as needed, but login page is automatic. If user uses pre-existing facebook account, when does their current user 
//account get saved to local DB? According to documentation, the profile parameter will have access to FB profile data

router.post("/user/login", userController.login_post);

//get one user-such as from users list or own user settings
router.get("/user/:id",userController.user_get);

//get all users (except for current user)-to see who can be friended
router.get("/users", userController.users_get);

//routes for editing user settings (ie edit password)

module.exports = router;