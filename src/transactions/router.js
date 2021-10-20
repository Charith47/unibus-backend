import express from 'express';
import { UsersCollection, TransactionsCollection } from '../firebase.config.js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const router = express.Router();

// helper functions
const findUserByUid = async (uid) => {
	return UsersCollection.where('uid', '==', uid)
		.get()
		.then((snapshot) => {
			if (!snapshot.empty) return snapshot.docs[0];
		})
		.catch((error) => {
			console.log(error);
		});
};
// end helper functions

const createTransaction = async (req, res) => {
	try {
		const amount = parseInt(req.body.amount);

		const userRef = UsersCollection.doc(req.body.userId);
		await userRef.update({
			walletAmount: firebase.firestore.FieldValue.increment(amount),
		});

		const userSnapshot = await userRef.get();
		const updatedWalletAmount = userSnapshot.get('walletAmount');

		// create a new transaction
		// uid, amount, total

		const transactionRef = await TransactionsCollection.add({
			userId: req.body.userId,
			amount: amount,
			type: req.body.type,
			date: new Date(),
			token: req.body.token,
		});

		res.status(200);
		res.send({
			updatedWalletAmount: updatedWalletAmount,
			transactionId: transactionRef.id,
		});
	} catch (error) {
		res.sendStatus(500);
		console.log(error);
	}
};

router.post('/create', createTransaction);

export default router;
