const mongoose = require("mongoose");
const User = mongoose.Schema({
    username: {
        type: String,
        min: 5,
        max: 50,
        require: true,
    },
    email: {
        type: String,
        min: 10,
        max: 50,
        require: true,
    },
    password: {
        type: String,
        min: 8,
        max: 15,
        require: true
    }
}, {
    timestamp: true,
})

module.exports = mongoose.model("user", User);