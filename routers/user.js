const express = require('express')
const User = require('../model/User')
const router = express.Router()


//update User
router.put('/:id', async (req, res) => {
    try {
        const admin = await User.findOne({ _id: req.params.id })
        if (req.params.id === req.body.userId || admin.isAdmin) {
            const user = await User.findOne({ _id: req.body.userId })
            await user.update({
                desc: req.body.desc,
                password: req.body.password,
                email: req.body.email,
                username: req.body.username
            })
            console.log(user)
            res.status(200).json('Update successfully')
        }
        else {
            res.status(400).json('Yon can only update your account')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    try {
        const admin = await User.findOne({ _id: req.params.id })
        if (req.params.id === req.body.userId || admin.isAdmin) {
            const user = await User.findOne({ _id: req.body.userId })
            await user.delete()
            res.status(200).json('Delete successfully')
        }
        else {
            res.status(400).json('Yon can only delete your account')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
//get a user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})
//follow 
router.put('/:id/follow', async (req, res) => {
    try {
        if (req.params.id !== req.body.userId) {
            const userFolower = await User.findByIdAndUpdate({ _id: req.params.id }, {
                $push: { followers: req.body.userId }
            })
            const userFolowing = await User.findByIdAndUpdate({ _id: req.body.userId }, {
                $push: { followings: req.params.id }
            })
            res.status(200).json('Follow successfully')
        } else {
            res.status(400).json('You cannot follow yourself')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

// unfollow
router.put('/:id/unfollow', async (req, res) => {
    try {
        if (req.params.id !== req.body.userId) {
            const userFolower = await User.findByIdAndUpdate({ _id: req.params.id }, {
                $pull: { followers: req.body.userId }
            })
            const userFolowing = await User.findByIdAndUpdate({ _id: req.body.userId }, {
                $pull: { followings: req.params.id }
            })
            res.status(200).json('Unfollow successfully')
        } else {
            res.status(400).json('You cannot unfollow yourself')
        }
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = router