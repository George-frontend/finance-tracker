import { addTransaction, deleteTransaction } from "../services/transactionService.js";

// Controller for adding a transaction
export async function addTransactionController(req, res) {
    try {
        const { userId, categoryId, amount, currency, description } = req.body;

        // Call your service function
        const transaction = await addTransaction(userId, categoryId, amount, currency, description);

        res.status(201).json(transaction); // return the created transaction
    } catch (err) {
        res.status(400).json({ error: err.message }); // handle errors
    }
}

// Controller for deleting a transaction
export async function deleteTransactionController(req, res) {
    try {
        const { transactionId, userId } = req.body;

        const deletedTransaction = await deleteTransaction(transactionId, userId);

        res.status(200).json(deletedTransaction); // return the deleted transaction
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
