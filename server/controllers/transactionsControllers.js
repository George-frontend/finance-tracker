import { fetchTransactionsService, createTransactionService } from "../services/transactionsService.js";

export async function getTransactions(req, res, next) {
  try {
    const { walletId } = req.params; 
    const transactions = await fetchTransactionsService(walletId);
    res.json(transactions);
  } catch (err) {
    next(err);
  }
};

export async function createTransaction(req, res, next) {
  try {
    const userId = req.user.id;
    const { walletId, categoryId, amount, description, transactionDate } = req.body;

    const transaction = await createTransactionService(
      userId,
      walletId,
      categoryId,
      amount,
      description,
      transactionDate
    );

    res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};
