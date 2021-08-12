import { firestore } from '../../firebase/firebase.utils';

export const addVoucherToUserId = (userId, feedback) => {
	try {
		const createdAt = new Date();

		firestore
			.collection(`users/${userId}/vouchers`)
			.add({ createdAt, ...feedback });
	} catch (e) {
		console.log('error adding voucher: ', e.message);
	}
};

export const getAllVouchersByUserIdRequest = async (userId) => {
	const results = [];
	const vouchersRef = firestore.collection(`users/${userId}/vouchers`);
	const snapshot = await vouchersRef.orderBy('expiredDate', 'asc').get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getVouchersByUserIdAndVoucherIdRequest = async (
	userId,
	voucherId
) => {
	let result = null;
	const vouchersRef = firestore.doc(`users/${userId}/vouchers/${voucherId}`);
	const doc = await vouchersRef.get();
	if (doc.exists) {
		result = {
			id: doc.id,
			...doc.data(),
		};
	} else {
		return Promise.reject(new Error('This voucher does not exist'));
	}
	return result;
};

export const deleteVoucherByUserId = (userId, voucherId) => {
	try {
		firestore.doc(`users/${userId}/vouchers/${voucherId}`).delete();
	} catch (e) {
		console.log('Error delete voucher, ', e.message);
	}
};
