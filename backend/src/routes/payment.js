const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/payment");

// Create a new payment
router.post("/", paymentController.createPayment);

// Get all payments with optional filtering
router.get("/", paymentController.getAllPayments);

// Get payment by ID
router.get("/:id", paymentController.getPaymentById);

// Update payment
router.put("/:id", paymentController.updatePayment);

// Delete payment
router.delete("/:id", paymentController.deletePayment);

// Get payments by payment plan
router.get("/plan/:paymentPlanId", paymentController.getPaymentsByPlan);

module.exports = router;
