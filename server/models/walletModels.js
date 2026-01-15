import { supabase } from "../config/supabase.js";

export async function fetchWalletByUser(userId) {
  const { data, error } = await supabase

    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data;
};

export async function createWalletForUser(userId, currency) {
  if (!["EUR", "USD"].includes(currency)) throw new Error("Invalid currency");

  const { data, error } = await supabase

    .from("wallets")
    .insert([{ user_id: userId, currency, balance: 0  }])
    .select()
    .maybeSingle();

  if (error) throw error;
  return data;
};

export async function updateWalletBalance(walletId, userId, newBalance) {
  const { data, error } = await supabase
    .from("wallets")
    .update({ balance: newBalance })
    .eq("id", walletId)
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};
