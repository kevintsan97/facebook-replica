// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/posts')
const app = express();

app.use(bodyParser.json({limit : "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb",extended: true}));
app.use(cors());


///
app.use('/posts', routes)
///
const CONNECTION_URL='mongodb+srv://taitsan2406:L6QOb9uwPwJdy29j@nodeexpressjs.ydrotpr.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
        .then (()=> app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));

