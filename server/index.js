import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE: backend
app.get('/api', (req, res) => {
    res.json({status: 'Backend is running'});
});

const PORT = 5000;

app.listen(PORT, () => 
    console.log(`Server running on http://localhost:${PORT}`));

exportDefault = (testConection());