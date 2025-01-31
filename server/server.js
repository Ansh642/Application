const express = require('express');
const policyholderRoutes = require('./routes/policyholderRoutes');
const database = require('./config/database');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Create the app instance
const app = express();

// for importing .env file
require("dotenv").config();

// middleware for sending data
app.use(express.json());

// file-upload
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

// calling the database function
database.connect();
app.use(
  cors({
      origin: "*",
      credentials : true,
  })
);

// Swagger Definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Claims Management API',
    version: '1.0.0',
    description: 'API for managing policyholders, claims, and policies.',
  },
  servers: [
    {
      url: 'http://localhost:5000', // Replace with your backend URL if deployed
    },
  ],
};

// Swagger Options
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API files where you will define the JSDoc
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
// Serve Swagger Docs at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Routes
app.use('/api', policyholderRoutes);

// Home route (for testing server)
app.use("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running...",
  });
});

// Start server on specified port
app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
