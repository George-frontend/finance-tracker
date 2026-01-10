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

export async function createTransaction(userId, walletId, amount, type) {
  const { data, error } = await supabase
    .from('transactions')
    .insert([{ user_id: userId, wallet_id: walletId, amount, type }])
    .single();

  if (error) throw error;
  return data;
};