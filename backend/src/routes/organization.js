const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organization");

// Create a new organization
router.post("/", organizationController.createOrganization);

// Get all organizations
router.get("/", organizationController.getAllOrganizations);

// Get organization by ID
router.get("/:id", organizationController.getOrganizationById);

// Update organization
router.put("/:id", organizationController.updateOrganization);

// Delete organization
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;
