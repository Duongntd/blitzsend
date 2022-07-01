import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDTz8WpnDfhI7QIAbWauHgWF5kwC0P654g',
	authDomain: 'blitz-send.firebaseapp.com',
	databaseURL:
		'https://blitz-send-default-rtdb.asia-southeast1.firebasedatabase.app',
	projectId: 'blitz-send',
	storageBucket: 'blitz-send.appspot.com',
	messagingSenderId: '717841888132',
	appId: '1:717841888132:web:469e05a6b90ed48a9f23d1',
	measurementId: 'G-53ZLR6H9DP',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
