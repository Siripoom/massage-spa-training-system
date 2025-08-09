const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendance");

// Mark single attendance
router.post("/", attendanceController.markAttendance);

// Bulk mark attendance
router.post("/bulk", attendanceController.bulkMarkAttendance);

// Get attendance records
router.get("/", attendanceController.getAttendance);

// Get student attendance summary
router.get("/student/:userId/summary", attendanceController.getStudentAttendanceSummary);

// Get student attendance summary for specific batch
router.get("/student/:userId/batch/:batchId/summary", attendanceController.getStudentAttendanceSummary);

// Get batch attendance report
router.get("/batch/:batchId/report", attendanceController.getBatchAttendanceReport);

module.exports = router;
