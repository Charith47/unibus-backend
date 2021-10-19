import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyDFSPET4XyxSkqDarFqq0lW6eLD2vxJHGI',
	authDomain: 'unibus-passenger.firebaseapp.com',
	projectId: 'unibus-passenger',
	storageBucket: 'unibus-passenger.appspot.com',
	messagingSenderId: '123855646851',
	appId: '1:123855646851:web:94f7120112d6069066ebb6',
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const UsersCollection = db.collection('users');
export const TransactionsCollection = db.collection('transactions');
