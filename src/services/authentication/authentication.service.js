import * as firebase from 'firebase';

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
