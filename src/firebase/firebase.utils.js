import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
	apiKey: 'AIzaSyAKTo3Ss2TTVhsQL18ExF4nobiKpT-iI_o',
	authDomain: 'holidaybuffetmobileapp.firebaseapp.com',
	projectId: 'holidaybuffetmobileapp',
	storageBucket: 'holidaybuffetmobileapp.appspot.com',
	messagingSenderId: '793894654107',
	appId: '1:793894654107:web:8bb5562d33c843c883363e',
	measurementId: 'G-21WWMB1JZ6',
};
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const firestore = firebase.firestore();

export default firebase;
