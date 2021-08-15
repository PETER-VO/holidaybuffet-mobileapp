import { firestore } from '../../firebase/firebase.utils';

export const addAllUserInformation = (information) => {
	try {
		const createdAt = new Date();
		firestore.collection(`scannedLists`).add({ createdAt, ...information });
	} catch (e) {
		console.log('error adding voucher: ', e.message);
	}
};

export const deleteAllScannedUserListRequest = async () => {
	try {
		const listRef = firestore.collection('scannedLists');
		const snapshot = await listRef.get();
		snapshot.forEach((doc) => {
			firestore.doc(`scannedLists/${doc.id}`).delete();
		});
	} catch (e) {
		console.log('error delete scanned list collection : ', e.message);
	}
};
