const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const friendship = new Schema({
    timestamp: {
        type: Date,
        default: Date.now()
    },
    friends: [{type: Schema.Types.ObjectId, ref: "User"}]
});

const Friendship = mongoose.model("Friendship", friendship);

module.exports = Friendship;