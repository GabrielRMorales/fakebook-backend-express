const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
   title: {
       type: String,
       required: true,
       maxLength: 25
   },
   text: {
       type: String,
       required: true
   },
   timestamp: {
       type: Date,
       default: Date.now()
   }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;