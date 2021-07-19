const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//sender
//recipient
//timestamp
//is there a need for two different types of friend request objects, or can it simply
//be filtered out later, depending on the user

const friendRequest = new Schema({
    sender: {type: Schema.Types.ObjectId, ref: "User"},
    recipient: {type: Schema.Types.ObjectId, ref: "User"},
    timestamp: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum: ["Pending","Accepted","Declined"]
    }
});

const FriendRequest = mongoose.model("FriendRequest", friendRequest);

module.exports = FriendRequest;