import express from 'express';
import { getWallet, createWallet } from '../controllers/walletControllers.js';
const router = express.Router();

router.get('/', getWallet);
router.post('/', createWallet);

export default router