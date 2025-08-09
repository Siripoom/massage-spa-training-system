const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Mark attendance
const markAttendance = async (req, res) => {
  try {
    const { 
      enrollmentId, 
      batchId, 
      userId, 
      date, 
      timeIn, 
      timeOut, 
      status, 
      notes 
    } = req.body;

    // Calculate total hours if timeIn and timeOut are provided
    let totalHours = 0;
    if (timeIn && timeOut) {
      const timeInDate = new Date(`${date}T${timeIn}`);
      const timeOutDate = new Date(`${date}T${timeOut}`);
      totalHours = (timeOutDate - timeInDate) / (1000 * 60 * 60); // Convert to hours
    }

    const attendance = await prisma.attendance.upsert({
      where: {
        enrollmentId_date: {
          enrollmentId,
          date: new Date(date)
        }
      },
      update: {
        timeIn: timeIn ? new Date(`${date}T${timeIn}`) : null,
        timeOut: timeOut ? new Date(`${date}T${timeOut}`) : null,
        totalHours,
        status: status || 'PRESENT',
        notes
      },
      create: {
        enrollmentId,
        batchId,
        userId,
        date: new Date(date),
        timeIn: timeIn ? new Date(`${date}T${timeIn}`) : null,
        timeOut: timeOut ? new Date(`${date}T${timeOut}`) : null,
        totalHours,
        status: status || 'PRESENT',
        notes
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true
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

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      error: "Failed to mark attendance",
      details: error.message
    });
  }
};

// Get attendance records
const getAttendance = async (req, res) => {
  try {
    const { 
      batchId, 
      userId, 
      enrollmentId, 
      date, 
      startDate, 
      endDate,
      page = 1, 
      limit = 50 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const where = {};
    if (batchId) where.batchId = batchId;
    if (userId) where.userId = userId;
    if (enrollmentId) where.enrollmentId = enrollmentId;
    if (date) where.date = new Date(date);
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const attendances = await prisma.attendance.findMany({
      where,
      skip,
      take: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        batch: {
          select: {
            id: true,
            name: true,
            batchNumber: true,
            totalHours: true
          }
        },
        enrollment: {
          select: {
            id: true,
            status: true
          }
        }
      },
      orderBy: [
        { date: 'desc' },
        { timeIn: 'asc' }
      ]
    });

    const total = await prisma.attendance.count({ where });

    res.json({
      attendances,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalCount: total,
        hasNext: skip + parseInt(limit) < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({
      error: "Failed to fetch attendance",
      details: error.message
    });
  }
};

// Get attendance summary for a student
const getStudentAttendanceSummary = async (req, res) => {
  try {
    const { userId, batchId } = req.params;

    const where = { userId };
    if (batchId) where.batchId = batchId;

    // Get total hours attended
    const attendanceSummary = await prisma.attendance.aggregate({
      where: {
        ...where,
        status: {
          in: ['PRESENT', 'LATE']
        }
      },
      _sum: {
        totalHours: true
      },
      _count: {
        id: true
      }
    });

    // Get attendance by status
    const attendanceByStatus = await prisma.attendance.groupBy({
      by: ['status'],
      where,
      _count: {
        id: true
      }
    });

    // Get batch info for total required hours
    const batch = batchId ? await prisma.batch.findUnique({
      where: { id: batchId },
      select: {
        totalHours: true,
        name: true,
        startDate: true,
        endDate: true
      }
    }) : null;

    const totalHoursAttended = attendanceSummary._sum.totalHours || 0;
    const totalRequiredHours = batch?.totalHours || 150;
    const progressPercentage = (totalHoursAttended / totalRequiredHours) * 100;

    res.json({
      userId,
      batchId,
      summary: {
        totalHoursAttended,
        totalRequiredHours,
        progressPercentage: Math.round(progressPercentage * 100) / 100,
        totalDaysAttended: attendanceSummary._count || 0,
        attendanceByStatus: attendanceByStatus.reduce((acc, curr) => {
          acc[curr.status.toLowerCase()] = curr._count.id;
          return acc;
        }, {}),
        batch
      }
    });
  } catch (error) {
    console.error("Error fetching attendance summary:", error);
    res.status(500).json({
      error: "Failed to fetch attendance summary",
      details: error.message
    });
  }
};

// Get batch attendance report
const getBatchAttendanceReport = async (req, res) => {
  try {
    const { batchId } = req.params;
    const { date, startDate, endDate } = req.query;

    const where = { batchId };
    if (date) {
      where.date = new Date(date);
    } else if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const attendances = await prisma.attendance.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: [
        { date: 'asc' },
        { user: { firstName: 'asc' } }
      ]
    });

    // Get all students in the batch
    const batchStudents = await prisma.enrollment.findMany({
      where: { batchId },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    // Get batch info
    const batch = await prisma.batch.findUnique({
      where: { id: batchId },
      include: {
        course: {
          select: {
            title: true
          }
        }
      }
    });

    res.json({
      batch,
      students: batchStudents,
      attendances,
      summary: {
        totalStudents: batchStudents.length,
        totalAttendanceRecords: attendances.length,
        attendanceByStatus: attendances.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error("Error fetching batch attendance report:", error);
    res.status(500).json({
      error: "Failed to fetch batch attendance report",
      details: error.message
    });
  }
};

// Bulk mark attendance for a batch
const bulkMarkAttendance = async (req, res) => {
  try {
    const { batchId, date, attendanceData } = req.body;
    // attendanceData format: [{ enrollmentId, userId, status, timeIn?, timeOut?, notes? }]

    const attendanceRecords = [];

    for (const record of attendanceData) {
      const { enrollmentId, userId, status, timeIn, timeOut, notes } = record;

      // Calculate total hours if timeIn and timeOut are provided
      let totalHours = 0;
      if (timeIn && timeOut) {
        const timeInDate = new Date(`${date}T${timeIn}`);
        const timeOutDate = new Date(`${date}T${timeOut}`);
        totalHours = (timeOutDate - timeInDate) / (1000 * 60 * 60);
      }

      const attendance = await prisma.attendance.upsert({
        where: {
          enrollmentId_date: {
            enrollmentId,
            date: new Date(date)
          }
        },
        update: {
          timeIn: timeIn ? new Date(`${date}T${timeIn}`) : null,
          timeOut: timeOut ? new Date(`${date}T${timeOut}`) : null,
          totalHours,
          status,
          notes
        },
        create: {
          enrollmentId,
          batchId,
          userId,
          date: new Date(date),
          timeIn: timeIn ? new Date(`${date}T${timeIn}`) : null,
          timeOut: timeOut ? new Date(`${date}T${timeOut}`) : null,
          totalHours,
          status,
          notes
        }
      });

      attendanceRecords.push(attendance);
    }

    res.json({
      message: "Bulk attendance marked successfully",
      recordsProcessed: attendanceRecords.length,
      attendances: attendanceRecords
    });
  } catch (error) {
    console.error("Error bulk marking attendance:", error);
    res.status(500).json({
      error: "Failed to bulk mark attendance",
      details: error.message
    });
  }
};

module.exports = {
  markAttendance,
  getAttendance,
  getStudentAttendanceSummary,
  getBatchAttendanceReport,
  bulkMarkAttendance
};
