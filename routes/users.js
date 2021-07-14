const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register_post);
//use more as needed, but login page is automatic. If user uses pre-existing facebook account, when does their current user 
//account get saved to local DB? According to documentation, the profile parameter will have access to FB profile data

router.post("/login", userController.login_post);


//get one user

//get all users
modules.exports = router;