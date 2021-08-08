import { firestore } from '../../firebase/firebase.utils';

export const addVoucherToUserId = (userId, feedback) => {
	try {
		const createdAt = new Date();
		return firestore
			.collection(`users/${userId}/vouchers`)
			.add({ createdAt, ...feedback });
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

export const deleteVoucherByUserId = (userId, voucherId) => {
	try {
		firestore.doc(`users/${userId}/vouchers/${voucherId}`).delete();
	} catch (e) {
		console.log('Error delete voucher, ', e.message);
	}
};
