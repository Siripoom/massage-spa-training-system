const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

// Get dashboard statistics
router.get("/stats", dashboardController.getDashboardStats);

// Get recent activities
router.get("/activities", dashboardController.getRecentActivities);

// Get course progress overview
router.get("/course-progress", dashboardController.getCourseProgress);

module.exports = router;
