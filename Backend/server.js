const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config()
const connectDB = require('./db/connection')
const postRoute = require('./Routes/postRoute')
const userRoute = require('./Routes/userRoute')
const morgan = require('morgan')
connectDB()

app.use(morgan('dev'))

app.use('/blog',postRoute)
app.use('/user',userRoute)
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on PORT ${process.env.PORT}`)
})