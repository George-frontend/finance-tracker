import { supabase } from '../config/supabase.js';

export async function fetchTransactionByWallet(walletId) {
    
    const { data, error} = await supabase

    .from('transactions')
    .select('*')
    .eq('wallet_id', walletId)
    .order('created_at', { ascending: false }); // Asceding will sorted results from data base

  if (error) throw error;
  return data;
};

export async function createTransaction(userId, walletId, categoryId, amount, description = '', transactionDate = new Date()) {
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
};
