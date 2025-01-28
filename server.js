const express = require('express');
const bodyParser = require('body-parser');
const policyholderRoutes = require('./routes/policyholderRoutes');

const app = express();
require("dotenv").config();
app.use(bodyParser.json());

// Policyholder Routes
app.use('/api/policyholders', policyholderRoutes);

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
