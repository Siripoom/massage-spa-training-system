const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new student application
const createStudentApplication = async (req, res) => {
  try {
    const {
      userId,
      courseId,
      batchId,
      personalInfo,
      documents,
      notes
    } = req.body;

    // Check if user already has an application for this course
    const existingApplication = await prisma.studentApplication.findFirst({
      where: {
        userId,
        courseId,
        status: {
          in: ['PENDING', 'UNDER_REVIEW', 'APPROVED']
        }
      }
    });

    if (existingApplication) {
      return res.status(400).json({
        error: "Active application already exists for this course"
      });
    }

    const application = await prisma.studentApplication.create({
      data: {
        userId,
        courseId,
        batchId,
        personalInfo,
        documents: documents || [],
        notes
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            duration: true,
            price: true
          }
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true,
            startDate: true,
            endDate: true
          }
        }
      }
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application
    });
  } catch (error) {
    console.error("Error creating student application:", error);
    res.status(500).json({
      error: "Failed to create application",
      details: error.message
    });
  }
};

// Get all student applications with filtering
const getAllStudentApplications = async (req, res) => {
  try {
    const {
      courseId,
      batchId,
      status,
      userId,
      page = 1,
      limit = 10
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {};
    if (courseId) where.courseId = courseId;
    if (batchId) where.batchId = batchId;
    if (status) where.status = status;
    if (userId) where.userId = userId;

    const applications = await prisma.studentApplication.findMany({
      where,
      skip,
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            imageUrl: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            duration: true,
            price: true
          }
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true,
            startDate: true,
            endDate: true
          }
        }
      },
      orderBy: {
        applicationDate: 'desc'
      }
    });

    const total = await prisma.studentApplication.count({ where });

    res.json({
      applications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalCount: total,
        hasNext: skip + parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({
      error: "Failed to fetch applications",
      details: error.message
    });
  }
};

// Get student application by ID
const getStudentApplicationById = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await prisma.studentApplication.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            imageUrl: true,
            birthDate: true,
            address: true
          }
        },
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            price: true,
            requirements: true
          }
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true,
            startDate: true,
            endDate: true,
            maxStudents: true,
            currentStudents: true,
            totalHours: true
          }
        }
      }
    });

    if (!application) {
      return res.status(404).json({
        error: "Application not found"
      });
    }

    res.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    res.status(500).json({
      error: "Failed to fetch application",
      details: error.message
    });
  }
};

// Update application status (approve/reject)
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, reviewedBy, notes } = req.body;

    // Validate status
    const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Invalid status"
      });
    }

    const updateData = {
      status,
      reviewedAt: new Date(),
      notes
    };

    if (reviewedBy) {
      updateData.reviewedBy = reviewedBy;
    }

    const application = await prisma.studentApplication.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        course: {
          select: {
            id: true,
            title: true
          }
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true
          }
        }
      }
    });

    // If approved, create enrollment
    if (status === 'APPROVED') {
      try {
        const enrollment = await prisma.enrollment.create({
          data: {
            userId: application.userId,
            courseId: application.courseId,
            batchId: application.batchId,
            status: 'ACTIVE'
          }
        });

        // Update batch current students count
        await prisma.batch.update({
          where: { id: application.batchId },
          data: {
            currentStudents: {
              increment: 1
            }
          }
        });

        res.json({
          message: "Application approved and enrollment created",
          application,
          enrollment
        });
      } catch (enrollmentError) {
        console.error("Error creating enrollment:", enrollmentError);
        res.json({
          message: "Application approved but enrollment creation failed",
          application,
          enrollmentError: enrollmentError.message
        });
      }
    } else {
      res.json({
        message: "Application status updated successfully",
        application
      });
    }
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({
      error: "Failed to update application status",
      details: error.message
    });
  }
};

// Update application documents
const updateApplicationDocuments = async (req, res) => {
  try {
    const { id } = req.params;
    const { documents } = req.body;

    const application = await prisma.studentApplication.update({
      where: { id },
      data: {
        documents: documents || []
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });

    res.json({
      message: "Documents updated successfully",
      application
    });
  } catch (error) {
    console.error("Error updating documents:", error);
    res.status(500).json({
      error: "Failed to update documents",
      details: error.message
    });
  }
};

// Get applications statistics
const getApplicationsStats = async (req, res) => {
  try {
    const { courseId, batchId } = req.query;

    const where = {};
    if (courseId) where.courseId = courseId;
    if (batchId) where.batchId = batchId;

    const stats = await prisma.studentApplication.groupBy({
      by: ['status'],
      where,
      _count: {
        id: true
      }
    });

    const totalApplications = await prisma.studentApplication.count({ where });

    const formattedStats = stats.reduce((acc, curr) => {
      acc[curr.status.toLowerCase()] = curr._count.id;
      return acc;
    }, {});

    res.json({
      totalApplications,
      byStatus: formattedStats,
      pending: formattedStats.pending || 0,
      approved: formattedStats.approved || 0,
      rejected: formattedStats.rejected || 0,
      underReview: formattedStats.under_review || 0
    });
  } catch (error) {
    console.error("Error fetching application stats:", error);
    res.status(500).json({
      error: "Failed to fetch application statistics",
      details: error.message
    });
  }
};

module.exports = {
  createStudentApplication,
  getAllStudentApplications,
  getStudentApplicationById,
  updateApplicationStatus,
  updateApplicationDocuments,
  getApplicationsStats
};
