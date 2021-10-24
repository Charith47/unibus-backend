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

app.use(
	cors({
		origin: '*',
	})
);

app.use(bodyParser.json());

// add routers to app
app.use('/transactions', Transactions);
app.use('/tickets', Tickets);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
