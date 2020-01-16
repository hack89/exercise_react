const express = require('express')
const router = express.Router()
const User = require('../models/user.model')

router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.json({ message: error })
    }
})


router.post('/add', async(req, res) => {
    const newUser = new User({
        username: req.body.username
    })
    try {
        await newUser.save()
        res.json('User Added!')
    } catch (error) {
        res.json({ message: error })
    }
})


router.delete('/:id', async(req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id })
        res.json('User deleted!')
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

module.exports = router;