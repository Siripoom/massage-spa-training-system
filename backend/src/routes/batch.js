const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batch");

// Create a new batch
router.post("/", batchController.createBatch);

// Get all batches with optional filtering
router.get("/", batchController.getAllBatches);

// Get next batch number for a course
router.get("/course/:courseId/next-number", batchController.getNextBatchNumber);

// Get batch by ID
router.get("/:id", batchController.getBatchById);

// Update batch
router.put("/:id", batchController.updateBatch);

// Delete batch
router.delete("/:id", batchController.deleteBatch);

module.exports = router;
