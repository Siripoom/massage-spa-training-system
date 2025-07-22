const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'uploads' directory if needed
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// sever start
app.get("/", (req, res) => {
  res.send("Welcome to the LMS API");
});

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Import routes
const userRoutes = require("./routes/user");

// Use routes
app.use("/api/users", userRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: "Something went wrong!",
    message: err.message || "Internal server error",
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

module.exports = app;
