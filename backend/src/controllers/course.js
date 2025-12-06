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
        status: status || 'DRAFT',
        registrationStart: registrationStart
          ? new Date(registrationStart)
          : null,
        registrationEnd: registrationEnd ? new Date(registrationEnd) : null,
      },
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Error in createCourse:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
};

// Get all courses with optional filtering
exports.getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, search } = req.query;

    const skip = (page - 1) * limit;
    const where = {};

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    // Get total count for pagination
    const total = await prisma.course.count({ where });

    const courses = await prisma.course.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        organizations: true,
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: courses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving courses',
      error: error.message
    });
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
      return res.status(404).json({
        success: false,
        message: "Course not found"
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Error in getCourseById:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving course',
      error: error.message
    });
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

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error('Error in updateCourse:', error);
    res.status(400).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.course.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error in deleteCourse:', error);
    res.status(400).json({
      success: false,
      message: 'Error deleting course',
      error: error.message
    });
  }
};
