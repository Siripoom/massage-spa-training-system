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
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const organizationRoutes = require("./routes/organization");
const courseRoutes = require("./routes/course");
const enrollmentRoutes = require("./routes/enrollment");
const paymentPlanRoutes = require("./routes/paymentPlan");
const paymentRoutes = require("./routes/payment");
const schedulesRoutes = require("./routes/schedules");
const bankRoutes = require("./routes/bank");
const themeSettingsRoutes = require("./routes/themeSettings");
const certificateTemplateRoutes = require("./routes/certificateTemplate");
const certificateElementRoutes = require("./routes/certificateElement");
const certificateRoutes = require("./routes/certificate");

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payment-plans", paymentPlanRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/schedules", schedulesRoutes);
app.use("/api/banks", bankRoutes);
app.use("/api/theme-settings", themeSettingsRoutes);
app.use("/api/certificate-templates", certificateTemplateRoutes);
app.use("/api/certificate-elements", certificateElementRoutes);
app.use("/api/certificates", certificateRoutes);

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
