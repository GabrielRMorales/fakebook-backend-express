const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_LINK, {useNewUrlParser: true, useUnifiedTopology: true});

//clean up
module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.Comment = require("./comment");