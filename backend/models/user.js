const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    friends: [
        {
            type: mongoose.Schema.Types.Object,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model("User", userSchema);
