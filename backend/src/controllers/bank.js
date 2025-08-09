const prisma = require("../config/db");

// Create a new bank
exports.createBank = async (req, res) => {
  try {
    const { name, accountHolder, accountNo, qrCodeUrl } = req.body;

    // Check if account number already exists
    const existingBank = await prisma.bank.findUnique({
      where: { accountNo },
    });

    if (existingBank) {
      return res.status(400).json({
        error: "Bank account number already exists",
      });
    }

    const bank = await prisma.bank.create({
      data: {
        name,
        accountHolder,
        accountNo,
        qrCodeUrl,
      },
    });

    res.status(201).json(bank);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all banks with optional filtering
exports.getAllBanks = async (req, res) => {
  try {
    const { name, accountHolder, search } = req.query;

    const where = {};

    if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    if (accountHolder) {
      where.accountHolder = {
        contains: accountHolder,
        mode: "insensitive",
      };
    }

    // General search across name, account holder, and account number
    if (search) {
      where.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          accountHolder: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          accountNo: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    const banks = await prisma.bank.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bank by ID
exports.getBankById = async (req, res) => {
  try {
    const { id } = req.params;

    const bank = await prisma.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }

    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get bank by account number
exports.getBankByAccountNo = async (req, res) => {
  try {
    const { accountNo } = req.params;

    const bank = await prisma.bank.findUnique({
      where: { accountNo },
    });

    if (!bank) {
      return res.status(404).json({ error: "Bank account not found" });
    }

    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update bank
exports.updateBank = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, accountHolder, accountNo, qrCodeUrl } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (accountHolder !== undefined) updateData.accountHolder = accountHolder;
    if (qrCodeUrl !== undefined) updateData.qrCodeUrl = qrCodeUrl;

    // Handle account number update with uniqueness check
    if (accountNo !== undefined) {
      // Check if the new account number already exists (excluding current bank)
      const existingBank = await prisma.bank.findFirst({
        where: {
          accountNo,
          id: { not: id },
        },
      });

      if (existingBank) {
        return res.status(400).json({
          error: "Bank account number already exists",
        });
      }

      updateData.accountNo = accountNo;
    }

    const bank = await prisma.bank.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json(bank);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bank not found" });
    }
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ error: "Bank account number already exists" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Delete bank
exports.deleteBank = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if bank exists
    const bank = await prisma.bank.findUnique({
      where: { id },
    });

    if (!bank) {
      return res.status(404).json({ error: "Bank not found" });
    }

    await prisma.bank.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bank not found" });
    }
    res.status(400).json({ error: error.message });
  }
};

// Get active banks (banks with QR codes)
exports.getActiveBanks = async (req, res) => {
  try {
    const banks = await prisma.bank.findMany({
      where: {
        qrCodeUrl: {
          not: null,
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update QR Code for bank
exports.updateBankQrCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { qrCodeUrl } = req.body;

    const bank = await prisma.bank.update({
      where: { id },
      data: { qrCodeUrl },
    });

    res.status(200).json(bank);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Bank not found" });
    }
    res.status(400).json({ error: error.message });
  }
};
