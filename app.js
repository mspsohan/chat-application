// external import
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');

// internal import
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler")
const loginRouter = require('./router/loginRouter')
const userRouter = require('./router/userRouter')
const inboxRouter = require('./router/inboxRouter')

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {})
   .then(() => console.log("database connection seccessfully"))

// Request Parser

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// set view engine
app.set("view engine", "ejs")

// set static folder
app.use(express.static(path.join(__dirname, "public")))

// parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET))

// Routing setuup
app.use('/', loginRouter)
app.use('/users', userRouter)
app.use('/inbox', inboxRouter)

// 404 not found error handling
app.use(notFoundHandler)

// Common error Handlear
app.use(errorHandler)

// Port
const port = process.env.PORT || 5000

app.listen(port, () => {
   console.log(`Server is Running on port: ${port}`)
})