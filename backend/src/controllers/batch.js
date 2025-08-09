const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new batch
const createBatch = async (req, res) => {
  try {
    const { 
      courseId, 
      batchNumber, 
      name, 
      startDate, 
      endDate, 
      maxStudents, 
      totalHours, 
      description, 
      location 
    } = req.body;

    // Check if batch number already exists for this course
    const existingBatch = await prisma.batch.findUnique({
      where: {
        courseId_batchNumber: {
          courseId,
          batchNumber
        }
      }
    });

    if (existingBatch) {
      return res.status(400).json({
        error: "Batch number already exists for this course"
      });
    }

    const batch = await prisma.batch.create({
      data: {
        courseId,
        batchNumber: parseInt(batchNumber),
        name,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        maxStudents: parseInt(maxStudents) || 30,
        totalHours: parseInt(totalHours) || 150,
        description,
        location
      },
      include: {
        course: true,
        _count: {
          select: {
            enrollments: true,
            attendances: true
          }
        }
      }
    });

    res.status(201).json({
      message: "Batch created successfully",
      batch
    });
  } catch (error) {
    console.error("Error creating batch:", error);
    res.status(500).json({
      error: "Failed to create batch",
      details: error.message
    });
  }
};

// Get all batches with optional filtering
const getAllBatches = async (req, res) => {
  try {
    const { courseId, status, page = 1, limit = 10 } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    if (courseId) where.courseId = courseId;
    if (status) where.status = status;

    const batches = await prisma.batch.findMany({
      where,
      skip,
      take: parseInt(limit),
      include: {
        course: {
          select: {
            id: true,
            title: true,
            duration: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            attendances: true,
            studentApplications: true
          }
        }
      },
      orderBy: [
        { courseId: 'asc' },
        { batchNumber: 'desc' }
      ]
    });

    const total = await prisma.batch.count({ where });

    res.json({
      batches,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalCount: total,
        hasNext: skip + parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error("Error fetching batches:", error);
    res.status(500).json({
      error: "Failed to fetch batches",
      details: error.message
    });
  }
};

// Get batch by ID
const getBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: {
        course: true,
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
              }
            }
          }
        },
        studentApplications: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true
              }
            }
          }
        },
        _count: {
          select: {
            enrollments: true,
            attendances: true,
            studentApplications: true
          }
        }
      }
    });

    if (!batch) {
      return res.status(404).json({
        error: "Batch not found"
      });
    }

    res.json(batch);
  } catch (error) {
    console.error("Error fetching batch:", error);
    res.status(500).json({
      error: "Failed to fetch batch",
      details: error.message
    });
  }
};

// Update batch
const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Convert date strings to Date objects if present
    if (updateData.startDate) {
      updateData.startDate = new Date(updateData.startDate);
    }
    if (updateData.endDate) {
      updateData.endDate = new Date(updateData.endDate);
    }

    // Convert numbers
    if (updateData.batchNumber) {
      updateData.batchNumber = parseInt(updateData.batchNumber);
    }
    if (updateData.maxStudents) {
      updateData.maxStudents = parseInt(updateData.maxStudents);
    }
    if (updateData.totalHours) {
      updateData.totalHours = parseInt(updateData.totalHours);
    }

    const batch = await prisma.batch.update({
      where: { id },
      data: updateData,
      include: {
        course: true,
        _count: {
          select: {
            enrollments: true,
            attendances: true
          }
        }
      }
    });

    res.json({
      message: "Batch updated successfully",
      batch
    });
  } catch (error) {
    console.error("Error updating batch:", error);
    res.status(500).json({
      error: "Failed to update batch",
      details: error.message
    });
  }
};

// Delete batch
const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if batch has enrollments
    const enrollmentCount = await prisma.enrollment.count({
      where: { batchId: id }
    });

    if (enrollmentCount > 0) {
      return res.status(400).json({
        error: "Cannot delete batch with existing enrollments"
      });
    }

    await prisma.batch.delete({
      where: { id }
    });

    res.json({
      message: "Batch deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting batch:", error);
    res.status(500).json({
      error: "Failed to delete batch",
      details: error.message
    });
  }
};

// Get next batch number for a course
const getNextBatchNumber = async (req, res) => {
  try {
    const { courseId } = req.params;

    const lastBatch = await prisma.batch.findFirst({
      where: { courseId },
      orderBy: { batchNumber: 'desc' }
    });

    const nextBatchNumber = lastBatch ? lastBatch.batchNumber + 1 : 1;

    res.json({
      nextBatchNumber,
      lastBatchNumber: lastBatch?.batchNumber || 0
    });
  } catch (error) {
    console.error("Error getting next batch number:", error);
    res.status(500).json({
      error: "Failed to get next batch number",
      details: error.message
    });
  }
};

module.exports = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
  getNextBatchNumber
};
