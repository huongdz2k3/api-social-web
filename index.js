const express = require('express')
const helmet = require('helmet')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const app = express()
const authRouter = require('./routers/auth')
const userRouter = require('./routers/user')
const postRouter = require('./routers/posts')

dotenv.config()
// ket noi database
mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

// thiet lap middleware
app.use(morgan("common"))
app.use(helmet())
app.use(express.json())

// import router
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)


//ket noi
app.listen(8080, () => {
    console.log('Backend is running')
})