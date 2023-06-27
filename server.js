const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const messageRoutes = require('./routes/messageRoutes')

// Express App

const app=express()
const db = process.env.DATABASE
const port = process.env.PORT

//Middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes

app.use('/api/messages' , messageRoutes)

//connecting to MongoDB

mongoose.connect(db)
    .then(()=>{
        app.listen(port, ()=> {
            console.log('connection to mongoDB has been established successfully on port ', port)
        })
    })
    .catch((error) => {
        console.log(error)
    })