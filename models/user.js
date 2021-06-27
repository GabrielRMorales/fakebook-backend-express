const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Email,
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
    post: {
        type: Schema.Types.ObjectId, ref: "Post"
    },
    comment: {
        type: Schema.Types.ObjectId, ref: "Comment"
    },
    likeGiven: {
        type: Schema.Types.ObjectId, ref: "LikeGiven"
    },
    likeReceived: {
        type: Schema.Types.ObjectId, ref: "LikeReceived"
    }


});

const User = mongoose.model("User", userSchema);
module.exports = User;
