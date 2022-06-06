const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        max: 20
    },
    desc: {
        type: String,
        max: 100
    },
    img: {
        type: String,
        max: 100
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model("Post", PostSchema)