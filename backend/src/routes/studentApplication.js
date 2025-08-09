const express = require("express");
const router = express.Router();
const studentApplicationController = require("../controllers/studentApplication");

// Create a new student application
router.post("/", studentApplicationController.createStudentApplication);

// Get all student applications with filtering
router.get("/", studentApplicationController.getAllStudentApplications);

// Get application statistics
router.get("/stats", studentApplicationController.getApplicationsStats);

// Get student application by ID
router.get("/:id", studentApplicationController.getStudentApplicationById);

// Update application status (approve/reject)
router.put("/:id/status", studentApplicationController.updateApplicationStatus);

// Update application documents
router.put("/:id/documents", studentApplicationController.updateApplicationDocuments);

module.exports = router;
