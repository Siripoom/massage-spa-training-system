const express = require("express");
const router = express.Router();
const enrollmentController = require("../controllers/enrollment");

// Create a new enrollment
router.post("/", enrollmentController.createEnrollment);

// Get all enrollments with optional filtering
router.get("/", enrollmentController.getAllEnrollments);

// Get enrollment by ID
router.get("/:id", enrollmentController.getEnrollmentById);

// Update enrollment status
router.put("/:id", enrollmentController.updateEnrollmentStatus);

// Delete enrollment
router.delete("/:id", enrollmentController.deleteEnrollment);

module.exports = router;
