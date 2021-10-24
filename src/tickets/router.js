import express from 'express';
import {
	UsersCollection,
	TransactionsCollection,
	RouteCollection,
} from '../firebase.config.js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const router = express.Router();

const searchForTickets = async (req, res) => {
	// we get two locations
	// find matching routes by seeing both array contains
	// calculate price by index gap
	// this function is shit; fml

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
		};
		result.push(ans);
	}

	res.send(result);
};

const buyTicket = async (req, res) => {
	// new ticket in user db
	// how price? get from search
	// new transaction then ?
};

const useTicket = async (req, res) => {
	// delete ticket from db
	// but create a new ride
};

router.post('/search', searchForTickets);
export default router;
