const express = require("express");
const router = express.Router;
const friendRequestController = require("../controllers/friendRequestController");

router.get("/friendRequest", friendRequestController.get_friend_request);

router.post("/friendRequest", friendRequestController.new_friend_request);

router.put("/friendRequest/edit/:id", friendRequestController.edit_friend_request);

router.delete("/friendRequest/delete/:id", friendRequestController.delete_friend_request);

module.exports = router;