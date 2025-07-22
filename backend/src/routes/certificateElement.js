const express = require("express");
const router = express.Router();
const certificateElementController = require("../controllers/certificateElement");

// Create a new certificate element
router.post("/", certificateElementController.createCertificateElement);

// Get all certificate elements with optional filtering
router.get("/", certificateElementController.getAllCertificateElements);

// Get certificate element by ID
router.get("/:id", certificateElementController.getCertificateElementById);

// Update certificate element
router.put("/:id", certificateElementController.updateCertificateElement);

// Duplicate certificate element
router.post(
  "/:id/duplicate",
  certificateElementController.duplicateCertificateElement
);

// Delete certificate element
router.delete("/:id", certificateElementController.deleteCertificateElement);

// Get elements by template
router.get(
  "/template/:templateId",
  certificateElementController.getElementsByTemplate
);

module.exports = router;
