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
   },
   user: {
       type: Schema.Types.ObjectId, ref: "User"
   },
   comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

//use a virtual to get comments by newest?

//this should have a remove hook to get rid of associated comments, right?
const Post = mongoose.model("Post", postSchema);

module.exports = Post;