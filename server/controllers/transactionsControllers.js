import { fetchTransactionByWallet, createTransaction} from "../models/transactionsModels.js";
import { fetchWalletByUser, updateWalletBalance } from "../models/walletModels.js";

export async function getTransactions(req, res, next) {
  try {
    const userId = req.user.id;
    const wallet = await fetchWalletByUser(userId);

    const transactions = await fetchTransactionByWallet(wallet.id);
    res.json(transactions);
  } catch (err) {
    next(err);
  }
}

export async function addTransaction(req, res, next) {
  try {
    const userId = req.user.id;
    const { amount, type } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    if (!["income", "expense"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const wallet = await fetchWalletByUser(userId);

    const transaction = await createTransaction(
      userId,
      wallet.id,
      amount,
      type
    );

    const newBalance =
      type === "income" ? wallet.amount + amount : wallet.amount - amount;

    await updateWalletBalance(wallet.id, newBalance);

    res.status(201).json({transaction, balance: newBalance,});

  } catch (err) {
    next(err);
  }
}
