import { supabase } from "../config/supabase.js";

export async function addTransaction(userId, categoryId, amount, currency, description) {
    
    // Fetch the wallet of the given user
    // Important: .single() ensures we get one wallet object, not an array
    const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (walletError) throw new Error("Database error fetching wallet"); // Handle DB errors
    if (!wallet) throw new Error("Wallet not found for this user");      // Ensure user has a wallet

    // Fetch the category to determine type (income/expense)
    // Important: category.type will determine how we calculate newBalance
    const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("name, type")
        .eq("id", categoryId)
        .single();
    
    // console.log("Category query result:", { data: category, error: categoryError });

    if (categoryError || !category) throw new Error("Category not found");

    // Calculate the new balance based on category type
    // Important: This must happen BEFORE inserting the transaction to keep wallet balance consistent
    let newBalance;
    if (category.type === "income") {
        newBalance = wallet.balance + amount; // Add if income
    } else {
        newBalance = wallet.balance - amount; // Subtract if expense
    }

    // Debuging
    // console.log("Inserting transaction with data:", {
    //     wallet_id: wallet.id,
    //     user_id: userId,
    //     category_id: categoryId,
    //     amount,
    //     currency,
    //     description
    // });

    // Insert the transaction into the transactions table
    // Important: Use wallet.id, not user-provided wallet_id, to prevent fraud
    const { data: newTransactionData, error: transactionError } = await supabase
        .from("transactions")
        .insert({
            wallet_id: wallet.id,   // Reference to wallet
            user_id: userId,        // Needed for RLS policies
            category_id: categoryId,
            amount,
            currency,
            description,
            date: new Date().toISOString()
        })
        .select(); // Important: .select() returns the inserted row

    if (transactionError) {
        // console.log("Supabase insert error:", transactionError);
        throw new Error("Failed to create transaction");
    }   

    // Update the wallet balance AFTER successful insert
    // Important: Do not update balance before insert to avoid inconsistencies on failure
    const { error: walletUpdateError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", wallet.id);

    if (walletUpdateError) throw new Error("Failed to update wallet balance");

    // Return the newly created transaction
    return newTransactionData[0]; // Return the inserted transaction object
};

export async function deleteTransaction(transactionId, userId) {

    // Get the transaction by its id
    const { data: transaction, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("id", transactionId)
        .single();

    if (error || !transaction) {
        throw new Error("Transaction not found");
    }

    // Check if the transaction belongs to the current user
    if (transaction.user_id !== userId) {
        throw new Error("Unauthorized");
    }

    // Get the category to know if it is income or expense
    const { data: category, error: categoryError } = await supabase
        .from("categories")
        .select("type")
        .eq("id", transaction.category_id)
        .single();

    if (categoryError || !category) {
        throw new Error("Category not found");
    }

    // Get the wallet related to this transaction
    const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("balance")
        .eq("id", transaction.wallet_id)
        .single();

    if (walletError || !wallet) {
        throw new Error("Wallet not found");
    }

    // Calculate the new balance (reverse of addTransaction)
    let newBalance;

    if (category.type === "income") {
        newBalance = wallet.balance - transaction.amount; // remove income
    } else {
        newBalance = wallet.balance + transaction.amount; // restore expense
    }

    // Update wallet balance
    const { error: walletUpdateError } = await supabase
        .from("wallets")
        .update({ balance: newBalance })
        .eq("id", transaction.wallet_id);

    if (walletUpdateError) {
        throw new Error("Failed to update wallet balance");
    }

    // Delete the transaction
    const { error: deleteError } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);

    if (deleteError) {
        throw new Error("Failed to delete transaction");
    }

    return transaction; // return deleted transaction
}