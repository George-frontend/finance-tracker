import { fetchWalletByUser, createWalletForUser } from "../models/walletModels.js";

export async function getWallet(req, res, next) {
  try {
    const userId = req.user.id; // Get from auth middleware
    const wallet = await fetchWalletByUser(userId);
    res.json(wallet);
  } catch (err) {
    next(err);
  }
}

export async function createWallet(req, res) {
    
    try {
        const userId = req.user.Id;
        const wallet = await createWalletForUser(userId);

        res.json(wallet);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}