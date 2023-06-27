const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const messageRoutes = require('./routes/messageRoutes')
const cors = require("cors");

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

app.use(cors())

const corsOption = {
  origin: 'https://top-ten-one.vercel.app/', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOption));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://top-ten-one.vercel.app/'); // Replace with your allowed origin(s)
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

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