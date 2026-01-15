import express from 'express';
import { getWallet, createWallet, updateWalletBalance } from '../controllers/walletControllers.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, getWallet);
router.post('/', authenticate, createWallet);
router.patch('/', authenticate, updateWalletBalance);

export default router;
