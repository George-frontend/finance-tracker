import express from 'express';
import { getTransactions, addTransaction } from '../controllers/transactionsControllers.js';
const router = express.Router();

router.get('/', getTransactions);
router.post('/', addTransaction);

export default router