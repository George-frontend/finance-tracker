import {
  fetchWalletByUser as fetchWalletFromDB,
  createWalletForUser as createWalletInDB,
  updateWalletBalance as updateWalletBalanceInDB,
} from "../models/walletModels.js";

import { supabase } from '../config/supabase.js';

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
    if (newBalance < 0) {
        throw new Error("Balance cannot be negative");
    }

    // Taking wallet with userId and walletId
    const { data: wallet, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("id", walletId)
        .eq("user_id", userId)
        .maybeSingle(); // return null if dont have a row

    if (error) throw error;
    if (!wallet) throw new Error("Wallet not found");

    // Updating balance
    const { data: updatedWallet, error: updateError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", walletId)
        .eq("user_id", userId)
        .single(); // return new row

    if (updateError) throw updateError;

    return updatedWallet;
}

