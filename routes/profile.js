const express = require("express");
const router = express.Router;
const profileController = "../controllers/profileController";

router.get("/home", profileController.home_get);

module.exports = router;