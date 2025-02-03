const express = require("express");
const policyholderRoutes = require("./routes/policyholderRoutes");
const database = require("./config/database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const Sentry = require("@sentry/node");
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Enable file uploads
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Connect to Database
database.connect();

// CORS Configuration (Update `allowedOrigins` for better security)
const allowedOrigins = ["http://localhost:5173", "https://yourfrontend.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Swagger API Documentation Setup
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Claims Management API",
    version: "1.0.0",
    description: "API for managing policyholders, claims, and policies.",
  },
  servers: [
    {
      url: process.env.BASE_URL || "http://localhost:5000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // API route files
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use("/api", policyholderRoutes);

// Default Route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "🚀 Server is running smoothly...",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

Sentry.init({ dsn: 'https://ae876285285821fd2c7b62c23d65ffcc@o4508753618927616.ingest.de.sentry.io/4508753634394192' });


app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
