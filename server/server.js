const express = require("express");
const policyholderRoutes = require("./routes/policyholderRoutes");
const database = require("./config/database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const promClient = require("prom-client"); // Import prom-client
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

app.use(cors());

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

// Prometheus Metrics Setup
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register }); // Collect default metrics (e.g., CPU, memory)

// Create a custom metric (example: HTTP request duration)
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Buckets for response time ranges
});

// Register the custom metric
register.registerMetric(httpRequestDurationMicroseconds);

// Middleware to track HTTP request duration
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.url, res.statusCode)
      .observe(duration);
  });
  next();
});

// Expose metrics endpoint for Prometheus
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Start Server
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app; // ✅ Export the app properly
