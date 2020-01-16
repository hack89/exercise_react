const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

require('dotenv/config')

app.use(cors())
app.use(express.json())
app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)


mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log('DB connected!')
)





app.listen(process.env.PORT || 5000, () => console.log('Server is RUNNING!'))