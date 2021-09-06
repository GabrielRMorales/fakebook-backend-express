const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    birthday: {
        type: Date
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
    },
    //should also keep track of friendRequests and friendship objects??
    //friends
    friends: [{type: Schema.Types.ObjectId, ref: "User"}]
    

});

//use a virtual for sorting posts by newest

const User = mongoose.model("User", userSchema);

module.exports = User;
