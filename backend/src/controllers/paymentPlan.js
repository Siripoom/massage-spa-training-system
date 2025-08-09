const prisma = require("../config/db");

// Create a new payment plan
exports.createPaymentPlan = async (req, res) => {
  try {
    const { enrollmentId, installments, amount, dueDate } = req.body;

    // Check if enrollment exists
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { course: true },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    // Check if enrollment is approved
    if (enrollment.status !== "APPROVED") {
      return res
        .status(400)
        .json({ error: "Enrollment must be approved to create payment plan" });
    }

    const paymentPlan = await prisma.paymentPlan.create({
      data: {
        enrollmentId,
        installments: parseInt(installments),
        amount: parseFloat(amount),
        dueDate: new Date(dueDate),
      },
      include: {
        enrollment: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            course: true,
          },
        },
        payments: true,
      },
    });

    res.status(201).json(paymentPlan);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all payment plans with optional filtering
exports.getAllPaymentPlans = async (req, res) => {
  try {
    const { status, enrollmentId, overdue } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (enrollmentId) {
      where.enrollmentId = enrollmentId;
    }

    // Filter overdue payment plans
    if (overdue === "true") {
      const currentDate = new Date();
      where.dueDate = { lt: currentDate };
      where.status = { not: "COMPLETED" };
    }

    const paymentPlans = await prisma.paymentPlan.findMany({
      where,
      include: {
        enrollment: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            course: true,
          },
        },
        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    res.status(200).json(paymentPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment plan by ID
exports.getPaymentPlanById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentPlan = await prisma.paymentPlan.findUnique({
      where: { id },
      include: {
        enrollment: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            course: true,
          },
        },
        payments: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!paymentPlan) {
      return res.status(404).json({ error: "Payment plan not found" });
    }

    res.status(200).json(paymentPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment plan
exports.updatePaymentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { installments, amount, status, dueDate, paidAmount, paidDate } =
      req.body;

    const updateData = {};

    if (installments !== undefined)
      updateData.installments = parseInt(installments);
    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (status !== undefined) {
      const validStatuses = ["PENDING", "ACTIVE", "COMPLETED"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error:
            "Invalid status. Status must be one of: PENDING, ACTIVE, COMPLETED",
        });
      }
      updateData.status = status;
    }
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (paidAmount !== undefined)
      updateData.paidAmount = parseFloat(paidAmount);
    if (paidDate !== undefined)
      updateData.paidDate = paidDate ? new Date(paidDate) : null;

    // Auto-complete payment plan if fully paid
    if (
      updateData.paidAmount !== undefined &&
      updateData.amount !== undefined
    ) {
      if (updateData.paidAmount >= updateData.amount) {
        updateData.status = "COMPLETED";
        if (!updateData.paidDate) {
          updateData.paidDate = new Date();
        }
      }
    }

    const paymentPlan = await prisma.paymentPlan.update({
      where: { id },
      data: updateData,
      include: {
        enrollment: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            course: true,
          },
        },
        payments: true,
      },
    });

    res.status(200).json(paymentPlan);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Payment plan not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete payment plan
exports.deletePaymentPlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if payment plan has any payments
    const paymentPlan = await prisma.paymentPlan.findUnique({
      where: { id },
      include: { payments: true },
    });

    if (!paymentPlan) {
      return res.status(404).json({ error: "Payment plan not found" });
    }

    if (paymentPlan.payments.length > 0) {
      return res.status(400).json({
        error: "Cannot delete payment plan with existing payments",
      });
    }

    await prisma.paymentPlan.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Payment plan not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
