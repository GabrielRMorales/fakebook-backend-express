const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo_url: {
        type: String
    },
    //refs
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    //make the below plural as needed
    likeGiven: {
        type: Schema.Types.ObjectId, ref: "LikeGiven"
    },
    likeReceived: {
        type: Schema.Types.ObjectId, ref: "LikeReceived"
    }


});

const User = mongoose.model("User", userSchema);
module.exports = User;
