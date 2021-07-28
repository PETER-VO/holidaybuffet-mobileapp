import * as firebase from 'firebase';
import { firestore } from '../../firebase/firebase.utils';

export const loginRequest = (email, password) =>
	firebase.auth().signInWithEmailAndPassword(email, password);

export const sendVerificationRequest = async (
	phoneNumber,
	recaptchaVerifier
) => {
	const phoneProvider = new firebase.auth.PhoneAuthProvider();
	return await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
};

export const confirmCodeRequest = async (verificationId, code) => {
	const credential = firebase.auth.PhoneAuthProvider.credential(
		verificationId,
		code
	);

	return await firebase.auth().signInWithCredential(credential);
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();
	if (!snapShot.exists) {
		const { phoneNumber } = userAuth;
		const createdAt = new Date();

		try {
			userRef.set({
				phoneNumber,
				createdAt,
				...additionalData,
			});
		} catch (e) {
			console.log('error creating user', e.message);
		}
	}
	return userRef;
};
