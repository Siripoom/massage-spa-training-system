const prisma = require("../config/db");

// Create a new certificate
exports.createCertificate = async (req, res) => {
  try {
    const { userId, courseId, templateId, certUrl, issueDate } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if template exists
    const template = await prisma.certificateTemplate.findUnique({
      where: { id: templateId },
    });

    if (!template) {
      return res.status(404).json({ error: "Certificate template not found" });
    }

    // Check if user has completed the course (has approved enrollment)
    const enrollment = await prisma.enrollment.findFirst({
      where: {
        userId,
        courseId,
        status: "APPROVED",
      },
    });

    if (!enrollment) {
      return res.status(400).json({
        error:
          "User must have approved enrollment for this course to receive certificate",
      });
    }

    // Check if certificate already exists for this user and course
    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (existingCertificate) {
      return res.status(400).json({
        error: "Certificate already exists for this user and course",
      });
    }

    const certificate = await prisma.certificate.create({
      data: {
        userId,
        courseId,
        templateId,
        certUrl,
        issueDate: issueDate ? new Date(issueDate) : new Date(),
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all certificates with optional filtering
exports.getAllCertificates = async (req, res) => {
  try {
    const { userId, courseId, templateId, status, search } = req.query;

    const where = {};

    if (userId) {
      where.userId = userId;
    }

    if (courseId) {
      where.courseId = courseId;
    }

    if (templateId) {
      where.templateId = templateId;
    }

    if (status) {
      where.status = status;
    }

    // Search across user name
    if (search) {
      where.user = {
        OR: [
          {
            firstName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    const certificates = await prisma.certificate.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        issueDate: "desc",
      },
    });

    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get certificate by ID
exports.getCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
        template: {
          include: {
            elements: true,
          },
        },
      },
    });

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update certificate
exports.updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { certUrl, status, issueDate } = req.body;

    const updateData = {};

    if (certUrl !== undefined) updateData.certUrl = certUrl;
    if (issueDate !== undefined) updateData.issueDate = new Date(issueDate);

    if (status !== undefined) {
      const validStatuses = ["PENDING", "APPROVED", "REJECTED"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error:
            "Invalid status. Status must be one of: PENDING, APPROVED, REJECTED",
        });
      }
      updateData.status = status;
    }

    const certificate = await prisma.certificate.update({
      where: { id },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(certificate);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete certificate
exports.deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if certificate exists
    const certificate = await prisma.certificate.findUnique({
      where: { id },
    });

    if (!certificate) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    // Only allow deletion of pending certificates
    if (certificate.status === "APPROVED") {
      return res.status(400).json({
        error: "Cannot delete approved certificates",
      });
    }

    await prisma.certificate.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get certificates by user
exports.getCertificatesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    const where = { userId };

    if (status) {
      where.status = status;
    }

    const certificates = await prisma.certificate.findMany({
      where,
      include: {
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        issueDate: "desc",
      },
    });

    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get certificates by course
exports.getCertificatesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { status } = req.query;

    const where = { courseId };

    if (status) {
      where.status = status;
    }

    const certificates = await prisma.certificate.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        issueDate: "desc",
      },
    });

    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Approve certificate
exports.approveCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: "APPROVED",
        issueDate: new Date(), // Update issue date when approved
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(certificate);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Reject certificate
exports.rejectCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        status: "REJECTED",
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    res.status(200).json(certificate);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Certificate not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
