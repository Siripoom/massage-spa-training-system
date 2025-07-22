const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");

// Create a new course
router.post("/", courseController.createCourse);

// Get all courses with optional filtering
router.get("/", courseController.getAllCourses);

// Get course by ID
router.get("/:id", courseController.getCourseById);

// Update course
router.put("/:id", courseController.updateCourse);

// Delete course
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
