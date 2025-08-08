const express = require("express");
const router = express.Router();
const paymentPlanController = require("../controllers/paymentPlan");

// Create a new payment plan
router.post("/", paymentPlanController.createPaymentPlan);

// Get all payment plans with optional filtering
router.get("/", paymentPlanController.getAllPaymentPlans);

// Get payment plan by ID
router.get("/:id", paymentPlanController.getPaymentPlanById);

// Update payment plan
router.put("/:id", paymentPlanController.updatePaymentPlan);

// Delete payment plan
router.delete("/:id", paymentPlanController.deletePaymentPlan);

module.exports = router;
