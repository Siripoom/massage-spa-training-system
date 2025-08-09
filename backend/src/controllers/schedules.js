const prisma = require("../config/db");

// Create a new schedule
exports.createSchedule = async (req, res) => {
  try {
    const { courseId, startTime, endTime, location } = req.body;

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Validate time range
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({
        error: "Start time must be before end time",
      });
    }

    // Check for schedule conflicts (same course, overlapping times)
    const conflictingSchedule = await prisma.schedules.findFirst({
      where: {
        courseId,
        OR: [
          {
            AND: [{ startTime: { lte: start } }, { endTime: { gt: start } }],
          },
          {
            AND: [{ startTime: { lt: end } }, { endTime: { gte: end } }],
          },
          {
            AND: [{ startTime: { gte: start } }, { endTime: { lte: end } }],
          },
        ],
      },
    });

    if (conflictingSchedule) {
      return res.status(400).json({
        error: "Schedule conflicts with existing schedule for this course",
      });
    }

    const schedule = await prisma.schedules.create({
      data: {
        courseId,
        startTime: start,
        endTime: end,
        location,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
          },
        },
      },
    });

    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all schedules with optional filtering
exports.getAllSchedules = async (req, res) => {
  try {
    const { courseId, location, startDate, endDate, upcoming } = req.query;

    const where = {};

    if (courseId) {
      where.courseId = courseId;
    }

    if (location) {
      where.location = {
        contains: location,
        mode: "insensitive",
      };
    }

    // Date range filtering
    if (startDate || endDate) {
      where.startTime = {};
      if (startDate) {
        where.startTime.gte = new Date(startDate);
      }
      if (endDate) {
        where.startTime.lte = new Date(endDate);
      }
    }

    // Filter for upcoming schedules only
    if (upcoming === "true") {
      where.startTime = {
        ...where.startTime,
        gte: new Date(),
      };
    }

    const schedules = await prisma.schedules.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            status: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const { id } = req.params;

    const schedule = await prisma.schedules.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            status: true,
            enrollments: {
              where: {
                status: "APPROVED",
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
              },
            },
          },
        },
      },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update schedule
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId, startTime, endTime, location } = req.body;

    const updateData = {};

    if (courseId !== undefined) {
      // Check if new course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
      updateData.courseId = courseId;
    }

    if (startTime !== undefined) {
      updateData.startTime = new Date(startTime);
    }

    if (endTime !== undefined) {
      updateData.endTime = new Date(endTime);
    }

    if (location !== undefined) {
      updateData.location = location;
    }

    // Get current schedule to validate time changes
    const currentSchedule = await prisma.schedules.findUnique({
      where: { id },
    });

    if (!currentSchedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    // Use current values if not provided in update
    const finalStartTime = updateData.startTime || currentSchedule.startTime;
    const finalEndTime = updateData.endTime || currentSchedule.endTime;
    const finalCourseId = updateData.courseId || currentSchedule.courseId;

    // Validate time range
    if (finalStartTime >= finalEndTime) {
      return res.status(400).json({
        error: "Start time must be before end time",
      });
    }

    // Check for schedule conflicts (excluding current schedule)
    const conflictingSchedule = await prisma.schedules.findFirst({
      where: {
        courseId: finalCourseId,
        id: { not: id }, // Exclude current schedule
        OR: [
          {
            AND: [
              { startTime: { lte: finalStartTime } },
              { endTime: { gt: finalStartTime } },
            ],
          },
          {
            AND: [
              { startTime: { lt: finalEndTime } },
              { endTime: { gte: finalEndTime } },
            ],
          },
          {
            AND: [
              { startTime: { gte: finalStartTime } },
              { endTime: { lte: finalEndTime } },
            ],
          },
        ],
      },
    });

    if (conflictingSchedule) {
      return res.status(400).json({
        error: "Schedule conflicts with existing schedule for this course",
      });
    }

    const schedule = await prisma.schedules.update({
      where: { id },
      data: updateData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
          },
        },
      },
    });

    res.status(200).json(schedule);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    // Get schedule to check if it's in the future
    const schedule = await prisma.schedules.findUnique({
      where: { id },
    });

    if (!schedule) {
      return res.status(404).json({ error: "Schedule not found" });
    }

    // Prevent deletion of past schedules
    const currentTime = new Date();
    if (schedule.startTime < currentTime) {
      return res.status(400).json({
        error: "Cannot delete past schedules",
      });
    }

    await prisma.schedules.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Schedule not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get schedules by course
exports.getSchedulesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { upcoming } = req.query;

    const where = { courseId };

    // Filter for upcoming schedules only
    if (upcoming === "true") {
      where.startTime = {
        gte: new Date(),
      };
    }

    const schedules = await prisma.schedules.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
