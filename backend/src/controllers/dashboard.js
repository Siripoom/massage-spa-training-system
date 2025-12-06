const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get dashboard overview statistics
const getDashboardStats = async (req, res) => {
  try {
    // Get total students (users with role STUDENT)
    const totalStudents = await prisma.user.count({
      where: { role: 'STUDENT' }
    });

    // Get total active courses
    const totalCourses = await prisma.course.count({
      where: { status: 'PUBLISHED' }
    });

    // Get total active batches
    const totalActiveBatches = await prisma.batch.count({
      where: { status: 'ACTIVE' }
    });

    // Get total enrollments
    const totalEnrollments = await prisma.enrollment.count({
      where: { status: 'ACTIVE' }
    });

    // Get total payments and revenue
    const paymentStats = await prisma.payment.aggregate({
      _count: { id: true },
      _sum: { amount: true },
      where: { status: 'COMPLETED' }
    });

    // Get recent students (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentStudents = await prisma.user.count({
      where: {
        role: 'STUDENT',
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    // Get students trend percentage
    const previousMonthStart = new Date();
    previousMonthStart.setDate(previousMonthStart.getDate() - 60);
    previousMonthStart.setHours(0, 0, 0, 0);

    const previousMonthEnd = new Date();
    previousMonthEnd.setDate(previousMonthEnd.getDate() - 30);
    previousMonthEnd.setHours(23, 59, 59, 999);

    const previousMonthStudents = await prisma.user.count({
      where: {
        role: 'STUDENT',
        createdAt: {
          gte: previousMonthStart,
          lte: previousMonthEnd
        }
      }
    });

    const studentTrend = previousMonthStudents > 0
      ? Math.round(((recentStudents - previousMonthStudents) / previousMonthStudents) * 100)
      : 100;

    res.json({
      success: true,
      data: {
        totalStudents,
        totalCourses,
        totalActiveBatches,
        totalEnrollments,
        totalPayments: paymentStats._count.id || 0,
        totalRevenue: paymentStats._sum.amount || 0,
        recentStudents,
        trends: {
          students: {
            value: Math.abs(studentTrend),
            isUp: studentTrend >= 0
          }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message
    });
  }
};

// Get recent activities
const getRecentActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    // Get recent enrollments
    const recentEnrollments = await prisma.enrollment.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        },
        batch: {
          include: {
            course: {
              select: { title: true }
            }
          }
        }
      }
    });

    // Get recent payments
    const recentPayments = await prisma.payment.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: { status: 'COMPLETED' },
      include: {
        enrollment: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    // Get recent certificates
    const recentCertificates = await prisma.certificate.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    // Combine and sort all activities
    const activities = [
      ...recentEnrollments.map(e => ({
        type: 'enrollment',
        title: 'นักเรียนใหม่สมัครเข้าเรียน',
        description: `${e.user.firstName} ${e.user.lastName} สมัครเรียน${e.batch.course.title}`,
        time: e.createdAt,
        avatar: e.user.firstName.charAt(0),
        color: '#8bc34a'
      })),
      ...recentPayments.map(p => ({
        type: 'payment',
        title: 'ชำระเงินเสร็จสิ้น',
        description: `${p.enrollment.user.firstName} ${p.enrollment.user.lastName} ชำระเงิน ${p.amount.toLocaleString()} บาท`,
        time: p.createdAt,
        avatar: p.enrollment.user.firstName.charAt(0),
        color: '#4caf50'
      })),
      ...recentCertificates.map(c => ({
        type: 'certificate',
        title: 'ออกใบประกาศนียบัตร',
        description: `ออกใบประกาศนียบัตรให้ ${c.user.firstName} ${c.user.lastName}`,
        time: c.createdAt,
        avatar: c.user.firstName.charAt(0),
        color: '#ff9800'
      }))
    ];

    // Sort by time and limit
    activities.sort((a, b) => new Date(b.time) - new Date(a.time));
    const limitedActivities = activities.slice(0, limit);

    res.json({
      success: true,
      data: limitedActivities
    });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch recent activities",
      error: error.message
    });
  }
};

// Get course progress overview
const getCourseProgress = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const batches = await prisma.batch.findMany({
      where: { status: { in: ['ACTIVE', 'PLANNING'] } },
      take: limit,
      orderBy: { startDate: 'desc' },
      include: {
        course: {
          select: {
            title: true,
            duration: true
          }
        },
        _count: {
          select: {
            enrollments: true
          }
        }
      }
    });

    // Calculate progress for each batch
    const batchProgress = await Promise.all(
      batches.map(async (batch) => {
        // Get total hours for this batch from all students
        const totalHoursAttended = await prisma.attendance.aggregate({
          where: {
            batchId: batch.id,
            status: { in: ['PRESENT', 'LATE'] }
          },
          _sum: {
            totalHours: true
          }
        });

        const avgHoursPerStudent = batch._count.enrollments > 0
          ? (totalHoursAttended._sum.totalHours || 0) / batch._count.enrollments
          : 0;

        const progress = batch.course.duration > 0
          ? Math.round((avgHoursPerStudent / batch.course.duration) * 100)
          : 0;

        return {
          id: batch.id,
          name: batch.name,
          courseName: batch.course.title,
          progress: Math.min(progress, 100),
          students: batch._count.enrollments,
          maxStudents: batch.maxStudents,
          totalHours: batch.totalHours,
          status: batch.status
        };
      })
    );

    res.json({
      success: true,
      data: batchProgress
    });
  } catch (error) {
    console.error("Error fetching course progress:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch course progress",
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentActivities,
  getCourseProgress
};
