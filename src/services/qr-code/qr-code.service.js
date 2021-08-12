import { firestore } from '../../firebase/firebase.utils';

export const addAllUserInformation = (information) => {
	try {
		const createdAt = new Date();
		firestore.collection(`scannedLists`).add({ createdAt, ...information });
	} catch (e) {
		console.log('error adding voucher: ', e.message);
	}
};
