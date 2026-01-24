import express from 'express';
import cors from 'cors';

// Imports
import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true}));// frontend dev port credentials: true
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/transaction", transactionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
