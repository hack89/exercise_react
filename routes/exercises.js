const express = require('express')
const router = express.Router()
const Exercise = require('../models/exercise.model')

router.get('/', async(req, res) => {
    try {
        const exercises = await Exercise.find()
        res.json(exercises)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})



router.post('/add', async(req, res) => {

    const exercise = new Exercise({
        username: req.body.username,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date)

    })

    try {
        const savedEx = await exercise.save()

        res.json(savedEx)

    } catch (err) {
        res.status(400).json({ message: err })
    }

})


router.get('/:id', async(req, res) => {
    try {
        const exerciseId = await Exercise.findById(req.params.id)
        res.json(exerciseId)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


router.delete('/:id', async(req, res) => {
    try {
        await Exercise.deleteOne({ _id: req.params.id })
        res.json('exercise deleted!')
    } catch (error) {
        res.status(400).json({ message: error })
    }
})




router.patch('/update/:id', async(req, res) => {
    try {
        const updatedExercise = await Exercise.updateOne({ _id: req.params.id }, {
            $set: {
                username: req.body.username,
                description: req.body.description,
                duration: Number(req.body.duration),
                date: Date.parse(req.body.date)
            }
        })
        res.json(updatedExercise)
    } catch (error) {
        res.status(400).json({ message: error })
    }
})




module.exports = router;