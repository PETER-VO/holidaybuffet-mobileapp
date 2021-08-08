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
