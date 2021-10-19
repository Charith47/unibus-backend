import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// router imports
import Transactions from './transactions/router.js';

app.use(
	cors({
		origin: '*',
	})
);

app.use(Transactions);

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
