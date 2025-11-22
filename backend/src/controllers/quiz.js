const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get upcoming quizzes
exports.getUpcomingQuizzes = async (req, res) => {
  try {
    const { limit = 5, courseId, batchId } = req.query;

    const where = {
      dueDate: {
        gte: new Date(), // Only future quizzes
      },
      isPublished: true,
    };

    if (courseId) where.courseId = courseId;
    if (batchId) where.batchId = batchId;

    const quizzes = await prisma.quiz.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true,
          },
        },
        _count: {
          select: {
            attempts: true,
            questions: true,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
      take: parseInt(limit),
    });

    // Get enrolled students count for each quiz
    const quizzesWithStudents = await Promise.all(
      quizzes.map(async (quiz) => {
        let studentsCount = 0;

        if (quiz.batchId) {
          // Count students in specific batch
          const batch = await prisma.batch.findUnique({
            where: { id: quiz.batchId },
            select: { currentStudents: true },
          });
          studentsCount = batch?.currentStudents || 0;
        } else {
          // Count all students enrolled in the course
          const enrollments = await prisma.enrollment.findMany({
            where: {
              courseId: quiz.courseId,
              status: 'APPROVED',
            },
          });
          studentsCount = enrollments.length;
        }

        return {
          id: quiz.id,
          title: quiz.title,
          course: quiz.course.title,
          batch: quiz.batch ? `รุ่นที่ ${quiz.batch.batchNumber}` : 'ทุกรุ่น',
          dueDate: quiz.dueDate,
          duration: quiz.duration,
          totalPoints: quiz.totalPoints,
          passingScore: quiz.passingScore,
          students: studentsCount,
          questionsCount: quiz._count.questions,
          attemptsCount: quiz._count.attempts,
          status: new Date() > quiz.dueDate ? 'expired' : 'scheduled',
        };
      })
    );

    res.json({
      success: true,
      data: quizzesWithStudents,
    });
  } catch (error) {
    console.error("Error fetching upcoming quizzes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming quizzes",
      error: error.message,
    });
  }
};

// Get all quizzes with pagination
exports.getAllQuizzes = async (req, res) => {
  try {
    const { page = 1, limit = 10, courseId, batchId, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {};
    if (courseId) where.courseId = courseId;
    if (batchId) where.batchId = batchId;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [quizzes, total] = await Promise.all([
      prisma.quiz.findMany({
        where,
        include: {
          course: {
            select: {
              id: true,
              title: true,
            },
          },
          batch: {
            select: {
              id: true,
              name: true,
              batchNumber: true,
            },
          },
          _count: {
            select: {
              questions: true,
              attempts: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: parseInt(skip),
        take: parseInt(limit),
      }),
      prisma.quiz.count({ where }),
    ]);

    res.json({
      success: true,
      data: quizzes,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quizzes",
      error: error.message,
    });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        course: true,
        batch: true,
        questions: {
          orderBy: {
            order: 'asc',
          },
        },
        _count: {
          select: {
            attempts: true,
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    console.error("Error fetching quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quiz",
      error: error.message,
    });
  }
};

// Create new quiz
exports.createQuiz = async (req, res) => {
  try {
    const {
      courseId,
      batchId,
      title,
      description,
      dueDate,
      duration,
      totalPoints,
      passingScore,
      isPublished,
      questions,
    } = req.body;

    // Validate required fields
    if (!courseId || !title || !dueDate || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create quiz with questions
    const quiz = await prisma.quiz.create({
      data: {
        courseId,
        batchId: batchId || null,
        title,
        description,
        dueDate: new Date(dueDate),
        duration: parseInt(duration),
        totalPoints: parseInt(totalPoints) || 100,
        passingScore: parseInt(passingScore) || 60,
        isPublished: isPublished || false,
        questions: questions ? {
          create: questions.map((q, index) => ({
            questionText: q.questionText,
            questionType: q.questionType || 'MULTIPLE_CHOICE',
            options: q.options || null,
            correctAnswer: q.correctAnswer,
            points: q.points || 1,
            order: index,
          })),
        } : undefined,
      },
      include: {
        course: true,
        batch: true,
        questions: true,
      },
    });

    res.status(201).json({
      success: true,
      data: quiz,
      message: "Quiz created successfully",
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create quiz",
      error: error.message,
    });
  }
};

// Update quiz
exports.updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      dueDate,
      duration,
      totalPoints,
      passingScore,
      isPublished,
    } = req.body;

    const quiz = await prisma.quiz.update({
      where: { id },
      data: {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        duration: duration ? parseInt(duration) : undefined,
        totalPoints: totalPoints ? parseInt(totalPoints) : undefined,
        passingScore: passingScore ? parseInt(passingScore) : undefined,
        isPublished,
      },
      include: {
        course: true,
        batch: true,
        questions: true,
      },
    });

    res.json({
      success: true,
      data: quiz,
      message: "Quiz updated successfully",
    });
  } catch (error) {
    console.error("Error updating quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update quiz",
      error: error.message,
    });
  }
};

// Delete quiz
exports.deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.quiz.delete({
      where: { id },
    });

    res.json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete quiz",
      error: error.message,
    });
  }
};
