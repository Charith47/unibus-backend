import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT;

// router imports
import Transactions from './transactions/router.js';
import Tickets from './tickets/router.js';
import Verification from './verification/router.js';

app.use(
	cors({
		origin: '*',
	})
);

app.use(bodyParser.json());

// add routers to app
app.use('/api/transactions', Transactions);
app.use('/api/tickets', Tickets);
app.use('/api/qr', Verification);

app.get('/api/', function (req, res) {
	res.send('<h1>Welcome to UNIBUS!</h1>');
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
