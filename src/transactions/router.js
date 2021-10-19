import express from 'express';
import { Users } from '../firebase.config.js';

const router = express.Router();

// recharge
// spend on tickets
// spend on subscriptions

// returns all users
const getUsers = async (req, res) => {
	const snapshot = await Users.get();
	res.send(snapshot.docs.map((doc) => doc.data()));
};

router.get('/users', getUsers);

export default router;
