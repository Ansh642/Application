const express = require("express");
const policyholderRoutes = require("./routes/policyholderRoutes");
const database = require("./config/database");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const promClient = require("prom-client"); // Import prom-client
require("dotenv").config();
const path = require('path');

require('./geminiApi');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Policyholder API',
      version: '1.0.0',
      description: 'API documentation for Policyholder management system',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Local server',
      },
      {
        url: 'https://application-xwew.onrender.com', // Replace with your production URL
        description: 'Production server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Custom Metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10], // Buckets for response time ranges
});

const httpRequestsTotal = new promClient.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

const httpErrorsTotal = new promClient.Counter({
  name: "http_errors_total",
  help: "Total number of HTTP errors",
  labelNames: ["method", "route", "status_code"],
});

// Register custom metrics
register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpErrorsTotal);

// Middleware to track HTTP requests and errors
app.use((req, res, next) => {
  const start = Date.now();

  // Increment total requests counter
  httpRequestsTotal.inc({ method: req.method, route: req.route?.path || req.url, status_code: res.statusCode });

  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000; // Convert to seconds

    // Track request duration
    httpRequestDurationMicroseconds
      .labels(req.method, req.route?.path || req.url, res.statusCode)
      .observe(duration);

    // Track errors (status code >= 400)
    if (res.statusCode >= 400) {
      httpErrorsTotal.inc({ method: req.method, route: req.route?.path || req.url, status_code: res.statusCode });
    }
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