const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 20,
            max: 50,
            require: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            require: true,
            min: 10,
            max: 15
        },
        profilepic: {
            type: String,
            max: 50
        },
        followers: {
            type: Array,
            default: []
        },
        followings: {
            type: Array,
            default: []
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamp: true }
)


module.exports = mongoose.model("User", UserSchema)

