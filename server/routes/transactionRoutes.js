import express from "express";
import { addTransactionController, deleteTransactionController } from "../controllers/transactionController.js";

const router = express.Router();

// POST request to add a transaction
router.post("/add", addTransactionController);

// DELETE request to delete a transaction
router.delete("/delete", deleteTransactionController);

export default router;
