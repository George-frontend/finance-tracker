import { supabase } from "../config/supabase.js";

export async function createWallet(userId) {
  const { data, error } = await supabase
    .from("wallets")
    .insert({
      user_id: userId,
      balance: 0,
      currency: "EUR",
    })
    .select()
    .single();

  if (error) {
    throw new Error("Database error");
  }

  return data;
};
