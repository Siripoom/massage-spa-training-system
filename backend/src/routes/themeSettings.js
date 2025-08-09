const express = require("express");
const router = express.Router();
const themeSettingsController = require("../controllers/themeSettings");

// Create a new theme settings
router.post("/", themeSettingsController.createThemeSettings);

// Get all theme settings with optional filtering
router.get("/", themeSettingsController.getAllThemeSettings);

// Get default theme
router.get("/default", themeSettingsController.getDefaultTheme);

// Get theme settings by ID
router.get("/:id", themeSettingsController.getThemeSettingsById);

// Get theme settings by name
router.get("/name/:name", themeSettingsController.getThemeSettingsByName);

// Update theme settings
router.put("/:id", themeSettingsController.updateThemeSettings);

// Duplicate theme settings
router.post("/:id/duplicate", themeSettingsController.duplicateThemeSettings);

// Delete theme settings
router.delete("/:id", themeSettingsController.deleteThemeSettings);

module.exports = router;
