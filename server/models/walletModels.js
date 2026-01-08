import { supabase } from '../config/supabase.js';

export async function fetchWalletByUser(userID) {

    const {data, error} = await supabase

    .from('wallets')
    .select('*')
    .eq('user_id', userID)
    .single();

    if (error) throw error;
    return data;
};

export async function createWalletForUser(userID) {
    
    const { data, error} = await supabase

    .from('wallets')
    .insert([{ user_id: userID}])
    .single();

    if (error) throw error;
    return data;
}