const express = require("express");
const router = express.Router();
const schedulesController = require("../controllers/schedules");

// Create a new schedule
router.post("/", schedulesController.createSchedule);

// Get all schedules with optional filtering
router.get("/", schedulesController.getAllSchedules);

// Get schedule by ID
router.get("/:id", schedulesController.getScheduleById);

// Update schedule
router.put("/:id", schedulesController.updateSchedule);

// Delete schedule
router.delete("/:id", schedulesController.deleteSchedule);

// Get schedules by course
router.get("/course/:courseId", schedulesController.getSchedulesByCourse);

module.exports = router;
