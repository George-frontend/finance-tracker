import { supabase } from "../config/supabase";

export async function addTransaction(userId, categoryId, amount, currency,description) {
    
    const { data, error } = await supabase
    .from("wallets")
    .select("*")
    .eq("user_id", userId)
    .single()

    if (error) throw new Error("Database error");

    if (!data) throw new Error("Wallet user not found");
};