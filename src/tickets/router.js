import express from 'express';
import { UsersCollection, TransactionsCollection } from '../firebase.config.js';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const router = express.Router();

const createTicket = async (req, res) => {
    // new ticket in db
};

const useTicket = async (req, res) => {
    // delete ticket from db
    // but create a new ride
};
