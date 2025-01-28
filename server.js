const express = require('express');
const bodyParser = require('body-parser');
const policyholderRoutes = require('./routes/policyholderRoutes');
const database = require('./config/database');

const app = express();

// for importing .env file
require("dotenv").config();

// middleware for sending data
app.use(bodyParser.json());

// calling the database function
database.connect();

// Routes
app.use('/api/policyholders', policyholderRoutes);

app.use("/",(req, res)=>{
    return res.json({
        success: true,
        message: "Server is running...",   
    });
});

app.listen(process.env.PORT,()=>{
    console.log(`App listening on port ${process.env.PORT}`)
});
