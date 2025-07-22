const prisma = require("../config/db");

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      price,
      duration,
      requirements,
      status,
      registrationStart,
      registrationEnd,
    } = req.body;

    const course = await prisma.course.create({
      data: {
        title,
        description,
        imageUrl,
        price: parseFloat(price),
        duration: parseInt(duration),
        requirements,
        status,
        registrationStart: registrationStart
          ? new Date(registrationStart)
          : null,
        registrationEnd: registrationEnd ? new Date(registrationEnd) : null,
      },
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all courses with optional filtering
exports.getAllCourses = async (req, res) => {
  try {
    const { status, search } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const courses = await prisma.course.findMany({
      where,
      include: {
        organizations: true,
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        organizations: true,
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      imageUrl,
      price,
      duration,
      requirements,
      status,
      registrationStart,
      registrationEnd,
    } = req.body;

    const course = await prisma.course.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        price: price ? parseFloat(price) : undefined,
        duration: duration ? parseInt(duration) : undefined,
        requirements,
        status,
        registrationStart: registrationStart
          ? new Date(registrationStart)
          : undefined,
        registrationEnd: registrationEnd
          ? new Date(registrationEnd)
          : undefined,
      },
    });

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
