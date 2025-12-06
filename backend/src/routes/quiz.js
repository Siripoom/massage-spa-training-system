const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quiz");
const authMiddleware = require("../middlewares/authMiddleware");

// All routes require authentication
router.use(authMiddleware);

// Get upcoming quizzes
router.get("/upcoming", quizController.getUpcomingQuizzes);

// Get all quizzes with pagination
router.get("/", quizController.getAllQuizzes);

// Get quiz by ID
router.get("/:id", quizController.getQuizById);

// Create new quiz (admin/teacher only)
router.post("/", quizController.createQuiz);

// Update quiz (admin/teacher only)
router.put("/:id", quizController.updateQuiz);

// Delete quiz (admin/teacher only)
router.delete("/:id", quizController.deleteQuiz);

module.exports = router;
