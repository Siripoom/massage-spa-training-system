const express = require("express");
const router = express.Router();
const certificateTemplateController = require("../controllers/certificateTemplate");

// Create a new certificate template
router.post("/", certificateTemplateController.createCertificateTemplate);

// Get all certificate templates with optional filtering
router.get("/", certificateTemplateController.getAllCertificateTemplates);

// Get certificate template by ID
router.get("/:id", certificateTemplateController.getCertificateTemplateById);

// Update certificate template
router.put("/:id", certificateTemplateController.updateCertificateTemplate);

// Duplicate certificate template
router.post(
  "/:id/duplicate",
  certificateTemplateController.duplicateCertificateTemplate
);

// Delete certificate template
router.delete("/:id", certificateTemplateController.deleteCertificateTemplate);

module.exports = router;
