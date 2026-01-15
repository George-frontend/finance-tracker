import { supabase } from "../config/supabase.js";

// return all transactions for wallet 
export async function fetchTransactionsService(walletId) {
  const { data, error } = await supabase
    .from('transactions')
    .select(`
      *,
      categories(name, type)
    `) // taking category name, type
    .eq('wallet_id', walletId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Create new transaction
export async function createTransactionService(userId, walletId, categoryId, amount, description = '', transactionDate = new Date()) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{
      user_id: userId,
      wallet_id: walletId,
      category_id: categoryId,
      amount,
      description,
      transaction_date: transactionDate
    }])
    .single();

  if (error) throw error;
  return data;
}
