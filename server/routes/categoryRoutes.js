import express from "express"

import { addCategoryController, deleteCategoryController } from "../controllers/categoryController.js"

const router = express.Router();

// POST request to add a transaction
router.post("/add", addCategoryController);

// DELETE request to delete a transaction
router.delete("/delete", deleteCategoryController);

export default router;