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

const searchForTickets = async (req, res) => {
	// we get two locations
	// find matching routes by seeing both array contains
	// calculate price by index gap
	const start = String.prototype.toLowerCase.apply(req.body.start);
	const destination = String.prototype.toLowerCase.apply(req.body.destination);

	const routeSnapshot = await RouteCollection.get();

	const routes = routeSnapshot.docs.map((doc) => {
		return doc.data();
	});

	const filteredRoutes = routes.filter((route) => {
		if (route.stops.includes(start) && route.stops.includes(destination))
			return true;
		else return false;
	});

	const prices = filteredRoutes.map((route) => {
		const startIndex = route.stops.indexOf(start);
		const destinationIndex = route.stops.indexOf(destination);

		const price = Math.abs(startIndex - destinationIndex) * 10;
		return price;
	});

	let result = [];
	for (let i = 0; i < filteredRoutes.length; i++) {
		const ans = {
			...filteredRoutes[i],
			price: prices[i],
			start: start,
			destination: destination,
		};
		result.push(ans);
	}

	res.send(result);
};

const buyTicket = async (req, res) => {
	try {
		const ticketRef = await TicketCollection.add({
			userId: req.body.userId,
			start: req.body.start,
			destination: req.body.destination,
			date: new Date().getTime(),
			expirationDate: null,
			route: req.body.route,
			price: req.body.price,
			type: req.body.type,
		});
		res.status(200);
		res.send({
			price: req.body.price,
		});
	} catch (error) {
		res.sendStatus(500);
	}
};

const useTicket = async (req, res) => {
	// delete ticket from db // by ticket id
	// but create a new ride
	TicketCollection.doc(req.body.ticketId)
		.delete()
		.then(() => {
			console.log('Ticket successfully deleted');
			res.sendStatus(200);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
};

const getLatestTickets = async (req, res) => {
	try {
		const latestTickets = await TicketCollection.where(
			'userId',
			'==',
			req.body.userId
		)
			.orderBy('date', 'desc')
			.limit(3)
			.get();

		if (latestTickets.docs.length != 0) {
			res.status(200);
			res.send(
				latestTickets.docs.map((doc) => {
					return {
						transactionId: doc.id,
						...doc.data(),
					};
				})
			);
		} else {
			res.status(200);
			res.send([]);
		}
	} catch (error) {
		res.sendStatus(500);
		console.log(error);
	}
};

const getAllTickets = async (req, res) => {
	try {
		const allTickets = await TicketCollection.where(
			'userId',
			'==',
			req.body.userId
		).get();
		if (allTickets.docs.length != 0) {
			res.status(200);
			res.send(
				allTickets.docs.map((doc) => {
					return {
						ticketId: doc.id,
						...doc.data(),
					};
				})
			);
		} else {
			res.status(200), res.send([]);
		}
	} catch (error) {
		res.sendStatus(500), console.log(error);
	}
};

router.post('/search', searchForTickets);
router.post('/buy', buyTicket);
router.post('/use', useTicket);
router.post('/all', getAllTickets);
router.post('/latest', getLatestTickets);

export default router;
