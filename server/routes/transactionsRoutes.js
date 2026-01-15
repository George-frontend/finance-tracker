import express from 'express';
import { getTransactions, createTransaction } from '../controllers/transactionsController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/:walletId', authenticate, getTransactions);
router.post('/', authenticate, createTransaction);

export default router;
