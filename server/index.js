import express from 'express'
import dotenv from 'dotenv'
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose';

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(err)
})

const app = express()
app.use(express.json())
app.use(cookieParser())

app.listen(process.env.PORT, () => {
    console.log(`server is running at port ${process.env.PORT}`)
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server error'
    return res.status(statusCode).json({
        success : false,
        message,statusCode
    })
}) 
