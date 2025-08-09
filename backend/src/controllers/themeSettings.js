const prisma = require("../config/db");

// Create a new theme setting
exports.createThemeSettings = async (req, res) => {
  try {
    const {
      name,
      primaryColor,
      secondaryColor,
      backgroundColor,
      textColor,
      fontFamily,
      fontSize,
    } = req.body;

    // Check if theme name already exists
    const existingTheme = await prisma.themeSettings.findFirst({
      where: { name },
    });

    if (existingTheme) {
      return res.status(400).json({
        error: "Theme with this name already exists",
      });
    }

    // Validate hex color format
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const colors = [primaryColor, secondaryColor, backgroundColor, textColor];
    const colorNames = [
      "primaryColor",
      "secondaryColor",
      "backgroundColor",
      "textColor",
    ];

    for (let i = 0; i < colors.length; i++) {
      if (colors[i] && !hexColorRegex.test(colors[i])) {
        return res.status(400).json({
          error: `Invalid ${colorNames[i]} format. Must be a valid hex color (e.g., #FF0000)`,
        });
      }
    }

    // Validate font size
    if (fontSize && (fontSize < 8 || fontSize > 72)) {
      return res.status(400).json({
        error: "Font size must be between 8 and 72 pixels",
      });
    }

    const themeSettings = await prisma.themeSettings.create({
      data: {
        name,
        primaryColor,
        secondaryColor,
        backgroundColor,
        textColor,
        fontFamily,
        fontSize: fontSize ? parseInt(fontSize) : 16,
      },
    });

    res.status(201).json(themeSettings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all theme settings with optional filtering
exports.getAllThemeSettings = async (req, res) => {
  try {
    const { name, fontFamily, search } = req.query;

    const where = {};

    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    if (fontFamily) {
      where.fontFamily = {
        contains: fontFamily,
        mode: "insensitive",
      };
    }

    // General search across name and font family
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          fontFamily: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const themeSettings = await prisma.themeSettings.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(themeSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get theme settings by ID
exports.getThemeSettingsById = async (req, res) => {
  try {
    const { id } = req.params;

    const themeSettings = await prisma.themeSettings.findUnique({
      where: { id },
    });

    if (!themeSettings) {
      return res.status(404).json({ error: "Theme settings not found" });
    }

    res.status(200).json(themeSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get theme settings by name
exports.getThemeSettingsByName = async (req, res) => {
  try {
    const { name } = req.params;

    const themeSettings = await prisma.themeSettings.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    if (!themeSettings) {
      return res.status(404).json({ error: "Theme settings not found" });
    }

    res.status(200).json(themeSettings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update theme settings
exports.updateThemeSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      primaryColor,
      secondaryColor,
      backgroundColor,
      textColor,
      fontFamily,
      fontSize,
    } = req.body;

    const updateData = {};

    // Check if new name already exists (excluding current theme)
    if (name !== undefined) {
      const existingTheme = await prisma.themeSettings.findFirst({
        where: {
          name,
          id: { not: id },
        },
      });

      if (existingTheme) {
        return res.status(400).json({
          error: "Theme with this name already exists",
        });
      }
      updateData.name = name;
    }

    // Validate hex color format for provided colors
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const colorUpdates = [
      { value: primaryColor, name: "primaryColor" },
      { value: secondaryColor, name: "secondaryColor" },
      { value: backgroundColor, name: "backgroundColor" },
      { value: textColor, name: "textColor" },
    ];

    for (const colorUpdate of colorUpdates) {
      if (colorUpdate.value !== undefined) {
        if (colorUpdate.value && !hexColorRegex.test(colorUpdate.value)) {
          return res.status(400).json({
            error: `Invalid ${colorUpdate.name} format. Must be a valid hex color (e.g., #FF0000)`,
          });
        }
        updateData[colorUpdate.name] = colorUpdate.value;
      }
    }

    if (fontFamily !== undefined) updateData.fontFamily = fontFamily;

    // Validate font size
    if (fontSize !== undefined) {
      const parsedFontSize = parseInt(fontSize);
      if (parsedFontSize < 8 || parsedFontSize > 72) {
        return res.status(400).json({
          error: "Font size must be between 8 and 72 pixels",
        });
      }
      updateData.fontSize = parsedFontSize;
    }

    const themeSettings = await prisma.themeSettings.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(themeSettings);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Theme settings not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete theme settings
exports.deleteThemeSettings = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if theme exists
    const themeSettings = await prisma.themeSettings.findUnique({
      where: { id },
    });

    if (!themeSettings) {
      return res.status(404).json({ error: "Theme settings not found" });
    }

    await prisma.themeSettings.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Theme settings not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get default theme or create one if none exists
exports.getDefaultTheme = async (req, res) => {
  try {
    let defaultTheme = await prisma.themeSettings.findFirst({
      orderBy: {
        createdAt: "asc",
      },
    });

    // If no themes exist, create a default one
    if (!defaultTheme) {
      defaultTheme = await prisma.themeSettings.create({
        data: {
          name: "Default Theme",
          primaryColor: "#1890ff",
          secondaryColor: "#52c41a",
          backgroundColor: "#ffffff",
          textColor: "#000000",
          fontFamily: "Arial, sans-serif",
          fontSize: 16,
        },
      });
    }

    res.status(200).json(defaultTheme);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Duplicate theme settings
exports.duplicateThemeSettings = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Get original theme
    const originalTheme = await prisma.themeSettings.findUnique({
      where: { id },
    });

    if (!originalTheme) {
      return res.status(404).json({ error: "Theme settings not found" });
    }

    // Check if new name already exists
    const existingTheme = await prisma.themeSettings.findFirst({
      where: { name },
    });

    if (existingTheme) {
      return res.status(400).json({
        error: "Theme with this name already exists",
      });
    }

    // Create duplicate theme
    const duplicatedTheme = await prisma.themeSettings.create({
      data: {
        name,
        primaryColor: originalTheme.primaryColor,
        secondaryColor: originalTheme.secondaryColor,
        backgroundColor: originalTheme.backgroundColor,
        textColor: originalTheme.textColor,
        fontFamily: originalTheme.fontFamily,
        fontSize: originalTheme.fontSize,
      },
    });

    res.status(201).json(duplicatedTheme);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
