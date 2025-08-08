const prisma = require("../config/db");

// Create a new organization
exports.createOrganization = async (req, res) => {
  try {
    const { name, courseId } = req.body;

    const organization = await prisma.organization.create({
      data: {
        name,
        courseId,
      },
      include: {
        course: true,
      },
    });

    res.status(201).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await prisma.organization.findMany({
      include: {
        course: true,
      },
    });
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get organization by ID
exports.getOrganizationById = async (req, res) => {
  try {
    const { id } = req.params;
    const organization = await prisma.organization.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update organization
exports.updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, courseId } = req.body;

    const organization = await prisma.organization.update({
      where: { id },
      data: {
        name,
        courseId,
      },
      include: {
        course: true,
      },
    });

    res.status(200).json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete organization
exports.deleteOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.organization.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
