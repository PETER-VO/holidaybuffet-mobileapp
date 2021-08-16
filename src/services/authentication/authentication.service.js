import firebase from 'firebase/app';
import { firestore } from '../../firebase/firebase.utils';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { addVoucherToUserId } from '../voucher/voucher.service';

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
	let phoneToken = '';
	if (!snapShot.exists) {
		await registerForPushNotificationsAsync()
			.then((result) => (phoneToken = result))
			.catch((e) => console.log('Register phone token error:', e.message));
		const { phoneNumber } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				phoneNumber,
				createdAt,
				phoneToken,
				...additionalData,
			});
			const availableVouchers = vouchersForNewUser();
			availableVouchers.map((voucher) => {
				addVoucherToUserId(snapShot.id, voucher);
			});
		} catch (e) {
			console.log('error creating user', e.message);
		}
	}
	return userRef;
};

const vouchersForNewUser = () => {
	const vouchers = [];
	const createdAt = new Date();
	const twoWeeks = 1000 * 60 * 60 * 24 * 14;
	const oneYear = 1000 * 60 * 60 * 24 * 365;
	const newCustomer = {
		createdAt,
		customerType: 'New Customer',
		expiredDate: new Date(createdAt.getTime() + twoWeeks),
		keyword: '50% OFF',
		titleVoucher: 'GET OFF 3€ FOR 1 BUFFET',
	};
	const checkInVoucher_1 = {
		createdAt,
		customerType: 'New Customer',
		expiredDate: new Date(createdAt.getTime() + oneYear),
		keyword: '1 Buffet',
		titleVoucher: 'FREE 1 DESSERT',
		checkIn: 3,
	};
	const checkInVoucher_2 = {
		createdAt,
		customerType: 'New Customer',
		expiredDate: new Date(createdAt.getTime() + oneYear),
		keyword: '1 Buffet',
		titleVoucher: 'GET OFF 30% FOR 1 BUFFET',
		checkIn: 5,
	};
	const checkInVoucher_3 = {
		createdAt,
		customerType: 'New Customer',
		expiredDate: new Date(createdAt.getTime() + oneYear),
		keyword: '50% OFF',
		titleVoucher: 'GET OFF 30% FOR 2 BUFFETS',
		checkIn: 8,
	};
	const checkInVoucher_4 = {
		createdAt,
		customerType: 'New Customer',
		expiredDate: new Date(createdAt.getTime() + oneYear),
		keyword: '50% OFF',
		titleVoucher: 'GET OFF 40% FOR 2 BUFFETS',
		checkIn: 12,
	};
	vouchers.push(
		newCustomer,
		checkInVoucher_1,
		checkInVoucher_2,
		checkInVoucher_3,
		checkInVoucher_4
	);
	return vouchers;
};

export const getUserFromId = async (id) => {
	return (userRef = firestore.doc(`users/${id}`));
};

export const incrementCreditRequest = async (data) => {
	const userRef = firestore.doc(`users/${data}`);
	let updatedCredit = 1;
	await userRef.onSnapshot((snapShot) => {
		const { credits } = snapShot.data();
		updatedCredit += credits;
	});
	try {
		setTimeout(() => {
			userRef.update({
				credits: updatedCredit,
			});
		}, 2000);
	} catch (e) {
		console.log('Error increment credit: ', e.message);
	}
};

export const registerForPushNotificationsAsync = async () => {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('HolidayBuffet', {
			name: 'HolidayBuffet',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};
