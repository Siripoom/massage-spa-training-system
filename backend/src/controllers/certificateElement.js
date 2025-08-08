const prisma = require("../config/db");

// Create a new certificate element
exports.createCertificateElement = async (req, res) => {
  try {
    const {
      templateId,
      type,
      elementKey,
      content,
      positionX,
      positionY,
      width,
      height,
      fontSize,
      fontFamily,
      color,
    } = req.body;

    // Check if template exists
    const template = await prisma.certificateTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return res.status(404).json({ error: "Certificate template not found" });
    }

    // Validate element type
    const validTypes = [
      "TEXT",
      "IMAGE",
      "SIGNATURE",
      "DATE",
      "NAME",
      "COURSE",
      "LOGO",
    ];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        error: `Invalid element type. Must be one of: ${validTypes.join(", ")}`,
      });
    }

    // Validate hex color format
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (color && !hexColorRegex.test(color)) {
      return res.status(400).json({
        error:
          "Invalid color format. Must be a valid hex color (e.g., #FF0000)",
      });
    }

    // Validate font size
    if (fontSize && (fontSize < 6 || fontSize > 200)) {
      return res.status(400).json({
        error: "Font size must be between 6 and 200 pixels",
      });
    }

    const certificateElement = await prisma.certificateElement.create({
      data: {
        templateId,
        type,
        elementKey,
        content,
        positionX: parseInt(positionX),
        positionY: parseInt(positionY),
        width: parseInt(width),
        height: parseInt(height),
        fontSize: fontSize ? parseInt(fontSize) : 16,
        fontFamily: fontFamily || "Arial, sans-serif",
        color: color || "#000000",
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(certificateElement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all certificate elements with optional filtering
exports.getAllCertificateElements = async (req, res) => {
  try {
    const { templateId, type, elementKey } = req.query;

    const where = {};

    if (templateId) {
      where.templateId = templateId;
    }

    if (type) {
      where.type = type;
    }

    if (elementKey) {
      where.elementKey = {
        contains: elementKey,
        mode: "insensitive",
      };
    }

    const certificateElements = await prisma.certificateElement.findMany({
      where,
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { templateId: "asc" },
        { positionY: "asc" },
        { positionX: "asc" },
      ],
    });

    res.status(200).json(certificateElements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get certificate element by ID
exports.getCertificateElementById = async (req, res) => {
  try {
    const { id } = req.params;

    const certificateElement = await prisma.certificateElement.findUnique({
      where: { id },
      include: {
        template: true,
      },
    });

    if (!certificateElement) {
      return res.status(404).json({ error: "Certificate element not found" });
    }

    res.status(200).json(certificateElement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update certificate element
exports.updateCertificateElement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      elementKey,
      content,
      positionX,
      positionY,
      width,
      height,
      fontSize,
      fontFamily,
      color,
    } = req.body;

    const updateData = {};

    // Validate element type if provided
    if (type !== undefined) {
      const validTypes = [
        "TEXT",
        "IMAGE",
        "SIGNATURE",
        "DATE",
        "NAME",
        "COURSE",
        "LOGO",
      ];
      if (!validTypes.includes(type)) {
        return res.status(400).json({
          error: `Invalid element type. Must be one of: ${validTypes.join(
            ", "
          )}`,
        });
      }
      updateData.type = type;
    }

    if (elementKey !== undefined) updateData.elementKey = elementKey;
    if (content !== undefined) updateData.content = content;
    if (positionX !== undefined) updateData.positionX = parseInt(positionX);
    if (positionY !== undefined) updateData.positionY = parseInt(positionY);
    if (width !== undefined) updateData.width = parseInt(width);
    if (height !== undefined) updateData.height = parseInt(height);
    if (fontFamily !== undefined) updateData.fontFamily = fontFamily;

    // Validate hex color format
    if (color !== undefined) {
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
      if (color && !hexColorRegex.test(color)) {
        return res.status(400).json({
          error:
            "Invalid color format. Must be a valid hex color (e.g., #FF0000)",
        });
      }
      updateData.color = color;
    }

    // Validate font size
    if (fontSize !== undefined) {
      const parsedFontSize = parseInt(fontSize);
      if (parsedFontSize < 6 || parsedFontSize > 200) {
        return res.status(400).json({
          error: "Font size must be between 6 and 200 pixels",
        });
      }
      updateData.fontSize = parsedFontSize;
    }

    const certificateElement = await prisma.certificateElement.update({
      where: { id },
      data: updateData,
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(certificateElement);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate element not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete certificate element
exports.deleteCertificateElement = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.certificateElement.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate element not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get elements by template
exports.getElementsByTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;

    const elements = await prisma.certificateElement.findMany({
      where: { templateId },
      orderBy: [{ positionY: "asc" }, { positionX: "asc" }],
    });

    res.status(200).json(elements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Duplicate certificate element
exports.duplicateCertificateElement = async (req, res) => {
  try {
    const { id } = req.params;
    const { positionX, positionY, elementKey } = req.body;

    // Get original element
    const originalElement = await prisma.certificateElement.findUnique({
      where: { id },
    });

    if (!originalElement) {
      return res.status(404).json({ error: "Certificate element not found" });
    }

    // Create duplicate element with new position
    const duplicatedElement = await prisma.certificateElement.create({
      data: {
        templateId: originalElement.templateId,
        type: originalElement.type,
        elementKey: elementKey || `${originalElement.elementKey}_copy`,
        content: originalElement.content,
        positionX:
          positionX !== undefined
            ? parseInt(positionX)
            : originalElement.positionX + 20,
        positionY:
          positionY !== undefined
            ? parseInt(positionY)
            : originalElement.positionY + 20,
        width: originalElement.width,
        height: originalElement.height,
        fontSize: originalElement.fontSize,
        fontFamily: originalElement.fontFamily,
        color: originalElement.color,
      },
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(duplicatedElement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
