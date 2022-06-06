const express = require('express')
const User = require('../model/User')
const router = express.Router()
const Post = require('../model/Post')
//create
router.post('/', async (req, res) => {
    try {
        const newPost = new Post({
            userId: req.body.userId,
            desc: req.body.desc,
            img: req.body.img
        })
        await newPost.save()
        console.log(newPost)
        res.status(200).json(newPost)
    } catch (err) {
        res.status(500).json(err)
    }
})
// update
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById({ _id: req.params.id })
        console.log(post)
        if (post.userId === req.body.userId) {
            const updatePost = await Post.findByIdAndUpdate({ _id: req.params.id }, {
                desc: req.body.desc,
                img: req.body.img
            })
            res.status(200).json("Updated your post")
        } else {
            res.status(400).json("You only can update your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        const user = await User.findById({ _id: req.body.userId })
        console.log(post)
        console.log(post.userId)
        console.log(user)

        if (post.userId === req.body.userId || user.isAdmin) {
            await post.delete()
            res.status(200).json("Deleted your post")
        } else {
            res.status(400).json("You only can delete your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id })
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//like / dislike
router.put('/:id/like', async (req, res) => {
    const postLike = await Post.findOne({ _id: req.params.id })
    try {
        if (!postLike.likes.includes(req.body.userId)) {
            const post = await Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { likes: req.body.userId } })
            res.status(200).json('Liked')
        }
        else {
            const post = await Post.findByIdAndUpdate({ _id: req.params.id }, { $pull: { likes: req.body.userId } })
            res.status(200).json('Disliked')
        }

    } catch (err) {
        res.status(500).json(err)
    }
})

// get time line 
router.get('/timeline/all', async (req, res) => {
    try {
        const currentUser = await User.findById({ _id: req.body.userId })
        console.log(currentUser)

        const userPost = await Post.find({ userId: currentUser._id })
        const followingsPost = await Promise.all(
            currentUser.followings.map((userId) => {
                return Post.find({ userId: userId })
            })
        )
        console.log(followingsPost)
        res.status(200).json(userPost.concat(...followingsPost))
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router