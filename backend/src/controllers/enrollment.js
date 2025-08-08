const prisma = require("../config/db");

// Create a new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if course exists and is active
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.status !== "ACTIVE") {
      return res
        .status(400)
        .json({ error: "Course is not active for enrollment" });
    }

    // Check if registration period is valid
    const currentDate = new Date();
    if (course.registrationStart && course.registrationEnd) {
      if (
        currentDate < course.registrationStart ||
        currentDate > course.registrationEnd
      ) {
        return res
          .status(400)
          .json({ error: "Course registration period is not active" });
      }
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        course: true,
      },
    });

    res.status(201).json(enrollment);
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get all enrollments with optional filtering
exports.getAllEnrollments = async (req, res) => {
  try {
    const { status, userId, courseId } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }
    if (userId) {
      where.userId = userId;
    }
    if (courseId) {
      where.courseId = courseId;
    }

    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get enrollment by ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const enrollment = await prisma.enrollment.findUnique({
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
        course: true,
      },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update enrollment status
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error:
          "Invalid status. Status must be one of: PENDING, APPROVED, REJECTED",
      });
    }

    const enrollment = await prisma.enrollment.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        course: true,
      },
    });

    res.status(200).json(enrollment);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete enrollment
exports.deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.enrollment.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
