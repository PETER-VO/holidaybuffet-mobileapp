import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyCG-VnlnobLlJAOUvKYsuSxmCNZSveYnYg',
	authDomain: 'mealstogo-4bcab.firebaseapp.com',
	projectId: 'mealstogo-4bcab',
	storageBucket: 'mealstogo-4bcab.appspot.com',
	messagingSenderId: '202467037900',
	appId: '1:202467037900:web:f65cfd183e75e5a04fa869',
	measurementId: 'G-GNGJSN6H6L',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export default firebase;
