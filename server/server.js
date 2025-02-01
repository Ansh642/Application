const express = require('express');
const policyholderRoutes = require('./routes/policyholderRoutes');
const database = require('./config/database');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Create the app instance
const app = express();
require("dotenv").config();


app.use(express.json());


app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

database.connect();

app.use(
  cors({
      origin: "*",
      credentials : true,
  })
);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Claims Management API',
    version: '1.0.0',
    description: 'API for managing policyholders, claims, and policies.',
  },
  servers: [
    {
      url: 'http://localhost:5000', 
    },
  ],
};


const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API files where you will define the JSDoc
};


const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', policyholderRoutes);


app.use("/", (req, res) => {
  return res.json({
    success: true,
    message: "Server is running...",
  });
});


app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
