import express from 'express';
import { getWallet, createWallet } from '../controllers/walletControllers.js';
const router = express.Router();

router.post('/get', getWallet);
router.post('/create', createWallet);

export default router