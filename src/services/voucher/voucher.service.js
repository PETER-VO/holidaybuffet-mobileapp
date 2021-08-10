import { firestore } from '../../firebase/firebase.utils';

export const addVoucherToUserId = (userId, feedback) => {
	try {
		const createdAt = new Date();

		firestore
			.collection(`users/${userId}/vouchers`)
			.add({ createdAt, ...feedback })
			.then(function (docRef) {
				docRef.get().then(function (doc) {
					console.log('Hello: ', doc.data());
				});
			})
			.catch(function (error) {
				console.error(error);
			});
	} catch (e) {
		console.log('error adding voucher: ', e.message);
	}
};

export const getVouchersByUserIdRequest = async (userId) => {
	const results = [];
	const vouchersRef = firestore.collection(`users/${userId}/vouchers`);
	const snapshot = await vouchersRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getListScannedUserRequest = async () => {
	const results = [];
	const listsScanRef = firestore.collection(`ListsScan`);
	const snapshot = await listsScanRef.get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getVouchersByUserIdAndVoucherId = async (userId, voucherId) => {
	let result = {};
	const vouchersRef = firestore.doc(`users/${userId}/vouchers/${voucherId}`);
	const doc = await vouchersRef.get();
	result = {
		id: doc.id,
		...doc.data(),
	};
	return result;
};

export const deleteVoucherByUserId = (userId, voucherId) => {
	try {
		firestore.doc(`users/${userId}/vouchers/${voucherId}`).delete();
	} catch (e) {
		console.log('Error delete voucher, ', e.message);
	}
};
