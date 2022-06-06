const express = require('express')
const User = require('../model/User')
const router = express.Router()

//register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

//login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        !user && res.status(400).json('We does not find this email')
        console.log(user.username)
        if (user.password !== req.body.password) {
            res.status(400).json('Wrong Password')
        }

        else res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router