import {
  fetchWalletByUser as fetchWalletFromDB,
  createWalletForUser as createWalletInDB,
  updateWalletBalance as updateWalletBalanceInDB,
} from "../models/walletModels.js";

// getWalletService

export async function getWalletService(userId) {

    const wallet = await fetchWalletFromDB(userId);

    if (!wallet) {
        throw new Error('Wallet not found');
    }

    return wallet;
};

// createWalletService

export async function createWalletService(userId, currency = 'EUR') {

    const existingWallet = await fetchWalletFromDB(userId);

    if (existingWallet) {
        throw new Error("Wallet already exists");
    }

    const wallet = await createWalletInDB(userId, currency);

    return wallet;
};

// updateBalanceService

export async function updateBalanceWalletService(walletId, userId, newBalance) {
    
    const wallet = await fetchWalletFromDB(userId);

    if (!wallet) {
        throw new Error("Wallet not found");
    }

    if (newBalance < 0) {
        throw new Error("Balance cannot be negative");
    }

    const updatedWallet = await updateWalletBalance(walletId, userId, newBalance);

    return updatedWallet;
};
