import express from 'express';
import {
	UsersCollection,
	TransactionsCollection,
	RouteCollection,
	TicketCollection,
} from '../firebase.config.js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const router = express.Router();

const verifyTicket = async (req, res) => {
	try {
		const ticketRef = await TicketCollection.doc(req.body.ticketId).get();
		const qrRoute = req.body.qrRoute;

		if (qrRoute === ticketRef.data().route) {
			if (!ticketRef.data().expirationDate) {
				TicketCollection.doc(req.body.ticketId)
					.delete()
					.then(() => {
						res.sendStatus(200);
					})
					.catch((error) => {
						res.sendStatus(500);
						console.log(error);
					});
			} else {
				// do nothing
				res.sendStatus(200);
			}
		} else {
			res.sendStatus(400);
		}
	} catch (error) {
		res.sendStatus(500);
		return;
	}
};

router.post('/verify', verifyTicket);

export default router;
