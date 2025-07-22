const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificate");

// Create a new certificate
router.post("/", certificateController.createCertificate);

// Get all certificates with optional filtering
router.get("/", certificateController.getAllCertificates);

// Get certificate by ID
router.get("/:id", certificateController.getCertificateById);

// Update certificate
router.put("/:id", certificateController.updateCertificate);

// Approve certificate
router.patch("/:id/approve", certificateController.approveCertificate);

// Reject certificate
router.patch("/:id/reject", certificateController.rejectCertificate);

// Delete certificate
router.delete("/:id", certificateController.deleteCertificate);

// Get certificates by user
router.get("/user/:userId", certificateController.getCertificatesByUser);

// Get certificates by course
router.get("/course/:courseId", certificateController.getCertificatesByCourse);

module.exports = router;
