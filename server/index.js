import express from 'express';
import cors from 'cors';

import walletRoutes from './routes/walletRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/wallet', walletRoutes);

// TEST ROUTE: backend
app.get('/api', (req, res) => {
    res.json({status: 'Backend is running'});
});

// TEST ROUTE: database
app.get('/api/test', async (req, res) => {
    console.log('Test route hit! Backend is working ✅');
    res.json({ message: 'Test route hit! Backend is working ✅' });
});

const PORT = 5000;

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`));
