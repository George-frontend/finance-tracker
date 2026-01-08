import { fetchWalletByUser, createWalletForUser } from "../models/walletModels.js";

export async function getWallet(req, res) {
    
    try {
        const userId = req.body.userId;
        const wallet = await fetchWalletByUser(userId);

        res.json(wallet);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function createWallet(req, res) {
    
    try {
        const userId = req.body.userId;
        const wallet = await createWalletForUser(userId);

        res.json(wallet);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}