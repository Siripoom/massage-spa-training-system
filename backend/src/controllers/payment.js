const prisma = require("../config/db");

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const {
      enrollmentId,
      paymentPlanId,
      amount,
      paymentType,
      installmentNumber,
      slipUrl,
      transferDate,
    } = req.body;

    // Check if enrollment exists
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }

    // Check if payment plan exists
    const paymentPlan = await prisma.paymentPlan.findUnique({
      where: { id: paymentPlanId },
    });

    if (!paymentPlan) {
      return res.status(404).json({ error: "Payment plan not found" });
    }

    // Validate payment type
    const validPaymentTypes = ["FULL", "INSTALLMENT"];
    if (!validPaymentTypes.includes(paymentType)) {
      return res.status(400).json({
        error: "Invalid payment type. Must be FULL or INSTALLMENT",
      });
    }

    // For installment payments, validate installment number
    if (paymentType === "INSTALLMENT") {
      if (
        !installmentNumber ||
        installmentNumber < 1 ||
        installmentNumber > paymentPlan.installments
      ) {
        return res.status(400).json({
          error: `Invalid installment number. Must be between 1 and ${paymentPlan.installments}`,
        });
      }

      // Check if this installment already exists
      const existingPayment = await prisma.payment.findFirst({
        where: {
          paymentPlanId,
          installmentNumber,
        },
      });

      if (existingPayment) {
        return res.status(400).json({
          error: `Installment ${installmentNumber} already exists for this payment plan`,
        });
      }
    }

    const payment = await prisma.payment.create({
      data: {
        enrollmentId,
        paymentPlanId,
        amount: parseFloat(amount),
        paymentType,
        installmentNumber: installmentNumber || 1,
        slipUrl: slipUrl || [],
        transferDate: transferDate ? new Date(transferDate) : null,
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
        paymentPlan: true,
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all payments with optional filtering
exports.getAllPayments = async (req, res) => {
  try {
    const { status, enrollmentId, paymentPlanId, paymentType } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (enrollmentId) {
      where.enrollmentId = enrollmentId;
    }

    if (paymentPlanId) {
      where.paymentPlanId = paymentPlanId;
    }

    if (paymentType) {
      where.paymentType = paymentType;
    }

    const payments = await prisma.payment.findMany({
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
        paymentPlan: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
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
        paymentPlan: true,
      },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update payment
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, amount, slipUrl, transferDate, receiptUrl } = req.body;

    const updateData = {};

    if (status !== undefined) {
      const validStatuses = ["PENDING", "COMPLETED", "REJECTED"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error:
            "Invalid status. Status must be one of: PENDING, COMPLETED, REJECTED",
        });
      }
      updateData.status = status;
    }

    if (amount !== undefined) updateData.amount = parseFloat(amount);
    if (slipUrl !== undefined) updateData.slipUrl = slipUrl;
    if (transferDate !== undefined)
      updateData.transferDate = transferDate ? new Date(transferDate) : null;
    if (receiptUrl !== undefined) updateData.receiptUrl = receiptUrl;

    const payment = await prisma.payment.update({
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
        paymentPlan: true,
      },
    });

    // If payment is completed, update payment plan's paid amount
    if (status === "COMPLETED") {
      const paymentPlan = await prisma.paymentPlan.findUnique({
        where: { id: payment.paymentPlanId },
        include: { payments: { where: { status: "COMPLETED" } } },
      });

      if (paymentPlan) {
        const totalPaid = paymentPlan.payments.reduce(
          (sum, p) => sum + p.amount,
          0
        );

        await prisma.paymentPlan.update({
          where: { id: payment.paymentPlanId },
          data: {
            paidAmount: totalPaid,
            status: totalPaid >= paymentPlan.amount ? "COMPLETED" : "ACTIVE",
            paidDate: totalPaid >= paymentPlan.amount ? new Date() : null,
          },
        });
      }
    }

    res.status(200).json(payment);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    // Get payment details before deletion
    const payment = await prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Only allow deletion of pending payments
    if (payment.status === "COMPLETED") {
      return res.status(400).json({
        error: "Cannot delete completed payments",
      });
    }

    await prisma.payment.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Payment not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get payments by payment plan
exports.getPaymentsByPlan = async (req, res) => {
  try {
    const { paymentPlanId } = req.params;

    const payments = await prisma.payment.findMany({
      where: { paymentPlanId },
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
        paymentPlan: true,
      },
      orderBy: {
        installmentNumber: "asc",
      },
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
