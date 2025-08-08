const prisma = require("../config/db");

// Create a new certificate template
exports.createCertificateTemplate = async (req, res) => {
  try {
    const { name, templateUrl, layoutData } = req.body;

    // Check if template name already exists
    const existingTemplate = await prisma.certificateTemplate.findFirst({
      where: { name },
    });

    if (existingTemplate) {
      return res.status(400).json({
        error: "Certificate template with this name already exists",
      });
    }

    // Validate layoutData is proper JSON
    let parsedLayoutData = {};
    if (layoutData) {
      try {
        parsedLayoutData =
          typeof layoutData === "string" ? JSON.parse(layoutData) : layoutData;
      } catch (error) {
        return res.status(400).json({
          error: "Invalid layout data format. Must be valid JSON",
        });
      }
    }

    const certificateTemplate = await prisma.certificateTemplate.create({
      data: {
        name,
        templateUrl,
        layoutData: parsedLayoutData,
      },
      include: {
        elements: true,
        certificates: true,
      },
    });

    res.status(201).json(certificateTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all certificate templates with optional filtering
exports.getAllCertificateTemplates = async (req, res) => {
  try {
    const { name, search, includeElements } = req.query;

    const where = {};

    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    // General search across name
    if (search) {
      where.name = {
        contains: search,
        mode: "insensitive",
      };
    }

    const include = {
      certificates: {
        select: {
          id: true,
          status: true,
          user: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      },
    };

    if (includeElements === "true") {
      include.elements = true;
    }

    const certificateTemplates = await prisma.certificateTemplate.findMany({
      where,
      include,
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(certificateTemplates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get certificate template by ID
exports.getCertificateTemplateById = async (req, res) => {
  try {
    const { id } = req.params;

    const certificateTemplate = await prisma.certificateTemplate.findUnique({
      where: { id },
      include: {
        elements: {
          orderBy: {
            createdAt: "asc",
          },
        },
        certificates: {
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
    });

    if (!certificateTemplate) {
      return res.status(404).json({ error: "Certificate template not found" });
    }

    res.status(200).json(certificateTemplate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update certificate template
exports.updateCertificateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, templateUrl, layoutData } = req.body;

    const updateData = {};

    // Check if new name already exists (excluding current template)
    if (name !== undefined) {
      const existingTemplate = await prisma.certificateTemplate.findFirst({
        where: {
          name,
          id: { not: id },
        },
      });

      if (existingTemplate) {
        return res.status(400).json({
          error: "Certificate template with this name already exists",
        });
      }
      updateData.name = name;
    }

    if (templateUrl !== undefined) updateData.templateUrl = templateUrl;

    // Validate and parse layoutData
    if (layoutData !== undefined) {
      try {
        updateData.layoutData =
          typeof layoutData === "string" ? JSON.parse(layoutData) : layoutData;
      } catch (error) {
        return res.status(400).json({
          error: "Invalid layout data format. Must be valid JSON",
        });
      }
    }

    const certificateTemplate = await prisma.certificateTemplate.update({
      where: { id },
      data: updateData,
      include: {
        elements: true,
        certificates: true,
      },
    });

    res.status(200).json(certificateTemplate);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate template not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete certificate template
exports.deleteCertificateTemplate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if template has any certificates
    const templateWithCertificates =
      await prisma.certificateTemplate.findUnique({
        where: { id },
        include: {
          certificates: true,
        },
      });

    if (!templateWithCertificates) {
      return res.status(404).json({ error: "Certificate template not found" });
    }

    if (templateWithCertificates.certificates.length > 0) {
      return res.status(400).json({
        error: "Cannot delete template with existing certificates",
      });
    }

    await prisma.certificateTemplate.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate template not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Duplicate certificate template
exports.duplicateCertificateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Get original template with elements
    const originalTemplate = await prisma.certificateTemplate.findUnique({
      where: { id },
      include: {
        elements: true,
      },
    });

    if (!originalTemplate) {
      return res.status(404).json({ error: "Certificate template not found" });
    }

    // Check if new name already exists
    const existingTemplate = await prisma.certificateTemplate.findFirst({
      where: { name },
    });

    if (existingTemplate) {
      return res.status(400).json({
        error: "Certificate template with this name already exists",
      });
    }

    // Create duplicate template with elements
    const duplicatedTemplate = await prisma.certificateTemplate.create({
      data: {
        name,
        templateUrl: originalTemplate.templateUrl,
        layoutData: originalTemplate.layoutData,
        elements: {
          create: originalTemplate.elements.map((element) => ({
            type: element.type,
            elementKey: element.elementKey,
            content: element.content,
            positionX: element.positionX,
            positionY: element.positionY,
            width: element.width,
            height: element.height,
            fontSize: element.fontSize,
            fontFamily: element.fontFamily,
            color: element.color,
          })),
        },
      },
      include: {
        elements: true,
      },
    });

    res.status(201).json(duplicatedTemplate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
