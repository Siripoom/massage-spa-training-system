const express = require("express");
const router = express.Router();
const quizAttemptController = require("../controllers/quizAttempt");
const authMiddleware = require("../middlewares/authMiddleware");

// All routes require authentication
router.use(authMiddleware);

// Get all quiz attempts with pagination
router.get("/", quizAttemptController.getAllAttempts);

// Get quiz attempt by ID
router.get("/:id", quizAttemptController.getAttemptById);

// Create quiz attempt (start quiz)
router.post("/", quizAttemptController.createAttempt);

// Submit quiz attempt
router.put("/:id/submit", quizAttemptController.submitAttempt);

// Delete quiz attempt
router.delete("/:id", quizAttemptController.deleteAttempt);

module.exports = router;
