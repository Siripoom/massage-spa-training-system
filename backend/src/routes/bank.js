const express = require("express");
const router = express.Router();
const bankController = require("../controllers/bank");

// Create a new bank
router.post("/", bankController.createBank);

// Get all banks with optional filtering
router.get("/", bankController.getAllBanks);

// Get active banks (with QR codes)
router.get("/active", bankController.getActiveBanks);

// Get bank by ID
router.get("/:id", bankController.getBankById);

// Get bank by account number
router.get("/account/:accountNo", bankController.getBankByAccountNo);

// Update bank
router.put("/:id", bankController.updateBank);

// Update bank QR code
router.patch("/:id/qr-code", bankController.updateBankQrCode);

// Delete bank
router.delete("/:id", bankController.deleteBank);

module.exports = router;
