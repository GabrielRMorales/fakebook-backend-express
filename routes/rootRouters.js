const express = require("express");
const rootRouter = express.Router();
const profile = require("./profile");
const users = require("./users");
const posts = require("./posts");
const comments = require("./comments");

rootRouter.use("/", profile);
rootRouter.use("/", users);
rootRouter.use("/", posts);
rootRouter.use("/", comments);

module.exports = rootRouter;

