import { firestore } from '../../firebase/firebase.utils';

export const getAllUsersRequest = async () => {
	const results = [];
	const usersRef = firestore.collection('users');
	const snapshot = await usersRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getAllScannedListRequest = async () => {
	const results = [];
	const scannedListRef = firestore.collection('ScannedLists');
	const snapshot = await scannedListRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getUserByUserIdRequest = async (userId) => {
	let result = {};
	const userRef = firestore.doc(`users/${userId}`);
	const doc = await userRef.get();
	result = {
		id: doc.id,
		...doc.data(),
	};
	return result;
};

export const getAllFeedBackByUserIdRequest = async (userId) => {
	let results = [];
	const feedbackRef = firestore.collection(`users/${userId}/feedbacks`);
	const snapshot = await feedbackRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const addAllUserInformation = (information) => {
	try {
		const createdAt = new Date();

		firestore.collection(`ScannedLists`).add({ createdAt, ...information });
	} catch (e) {
		console.log('error adding voucher: ', e.message);
	}
};

export const updateListCheckInByUserIdRequest = async (
	userId,
	listDateCheckIn
) => {
	try {
		const createdAt = new Date();
		listDateCheckIn.push(createdAt);
		const userRef = firestore.doc(`users/${userId}`);
		await userRef.update({ listDateCheckIn });
	} catch (e) {
		console.log('error updating listCheckIn: ', e.message);
	}
};
