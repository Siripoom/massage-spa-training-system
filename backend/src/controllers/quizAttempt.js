const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all quiz attempts with pagination and filters
 */
const getAllAttempts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      quizId,
      userId,
      enrollmentId,
      isPassed,
      search,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {};

    if (quizId) where.quizId = quizId;
    if (userId) where.userId = userId;
    if (enrollmentId) where.enrollmentId = enrollmentId;
    if (isPassed !== undefined) where.isPassed = isPassed === "true";

    // Search in user or quiz title
    if (search) {
      where.OR = [
        { user: { firstName: { contains: search, mode: "insensitive" } } },
        { user: { lastName: { contains: search, mode: "insensitive" } } },
        { quiz: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [attempts, total] = await Promise.all([
      prisma.quizAttempt.findMany({
        where,
        skip,
        take,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          quiz: {
            select: {
              id: true,
              title: true,
              totalPoints: true,
              passingScore: true,
            },
          },
          enrollment: {
            select: {
              id: true,
              course: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: { submittedAt: "desc" },
      }),
      prisma.quizAttempt.count({ where }),
    ]);

    const formattedAttempts = attempts.map((attempt) => {
      const percentage = attempt.score !== null
        ? Math.round((attempt.score / attempt.quiz.totalPoints) * 100)
        : 0;

      let status = 'Pending';
      if (attempt.submittedAt) {
        status = attempt.isPassed ? 'Passed' : 'Failed';
      }

      return {
        id: attempt.id,
        quizTitle: attempt.quiz.title,
        studentName: `${attempt.user.firstName} ${attempt.user.lastName}`,
        studentEmail: attempt.user.email,
        score: attempt.score,
        totalPoints: attempt.quiz.totalPoints,
        percentage,
        isPassed: attempt.isPassed,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        status,
      };
    });

    res.json({
      success: true,
      data: formattedAttempts,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Error fetching quiz attempts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz attempts",
      error: error.message,
    });
  }
};

/**
 * Get quiz attempt by ID
 */
const getAttemptById = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await prisma.quizAttempt.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        quiz: {
          select: {
            id: true,
            title: true,
            totalPoints: true,
            passingScore: true,
            questions: {
              select: {
                id: true,
                questionText: true,
                options: true,
                correctAnswer: true,
                points: true,
              },
            },
          },
        },
        enrollment: {
          select: {
            id: true,
            course: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz attempt not found",
      });
    }

    const formattedAttempt = {
      id: attempt.id,
      quizTitle: attempt.quiz.title,
      studentName: `${attempt.user.firstName} ${attempt.user.lastName}`,
      studentEmail: attempt.user.email,
      score: attempt.score,
      totalPoints: attempt.quiz.totalPoints,
      percentage: Math.round((attempt.score / attempt.quiz.totalPoints) * 100),
      isPassed: attempt.isPassed,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      answers: attempt.answers,
      questions: attempt.quiz.questions,
      status: attempt.isPassed ? "Passed" : "Failed",
    };

    res.json({
      success: true,
      data: formattedAttempt,
    });
  } catch (error) {
    console.error("Error fetching quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz attempt",
      error: error.message,
    });
  }
};

/**
 * Create quiz attempt (start quiz)
 */
const createAttempt = async (req, res) => {
  try {
    const { quizId, userId, enrollmentId } = req.body;

    if (!quizId || !userId || !enrollmentId) {
      return res.status(400).json({
        success: false,
        message: "Quiz ID, User ID, and Enrollment ID are required",
      });
    }

    // Check if quiz exists
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    // Create attempt
    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        userId,
        enrollmentId,
        startedAt: new Date(),
      },
      include: {
        quiz: {
          select: {
            title: true,
            duration: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: attempt,
      message: "Quiz attempt started successfully",
    });
  } catch (error) {
    console.error("Error creating quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create quiz attempt",
      error: error.message,
    });
  }
};

/**
 * Submit quiz attempt
 */
const submitAttempt = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    if (!answers) {
      return res.status(400).json({
        success: false,
        message: "Answers are required",
      });
    }

    // Get attempt with quiz and questions
    const attempt = await prisma.quizAttempt.findUnique({
      where: { id },
      include: {
        quiz: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz attempt not found",
      });
    }

    if (attempt.submittedAt) {
      return res.status(400).json({
        success: false,
        message: "Quiz attempt already submitted",
      });
    }

    // Calculate score
    let totalScore = 0;
    const questions = attempt.quiz.questions;

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        totalScore += question.points;
      }
    });

    const isPassed = totalScore >= attempt.quiz.passingScore;

    // Update attempt
    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id },
      data: {
        answers,
        score: totalScore,
        isPassed,
        submittedAt: new Date(),
      },
      include: {
        quiz: {
          select: {
            title: true,
            totalPoints: true,
            passingScore: true,
          },
        },
      },
    });

    res.json({
      success: true,
      data: {
        ...updatedAttempt,
        percentage: Math.round((totalScore / attempt.quiz.totalPoints) * 100),
      },
      message: "Quiz submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit quiz attempt",
      error: error.message,
    });
  }
};

/**
 * Delete quiz attempt
 */
const deleteAttempt = async (req, res) => {
  try {
    const { id } = req.params;

    const attempt = await prisma.quizAttempt.findUnique({
      where: { id },
    });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Quiz attempt not found",
      });
    }

    await prisma.quizAttempt.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Quiz attempt deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quiz attempt:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete quiz attempt",
      error: error.message,
    });
  }
};

module.exports = {
  getAllAttempts,
  getAttemptById,
  createAttempt,
  submitAttempt,
  deleteAttempt,
};
