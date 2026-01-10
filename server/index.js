import express from 'express';
import cors from 'cors';

import walletRoutes from './routes/walletRoutes.js';
import transactionsRoutes from './routes/transactionsRoutes.js';
import { authenticate } from './middleware/auth.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true}));// frontend dev port credentials: true
app.use(express.json());

// Loging request
app.use(logger)

// Routes
app.use('/api/wallet', authenticate, walletRoutes);
app.use('/api/transactions', authenticate, transactionsRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
