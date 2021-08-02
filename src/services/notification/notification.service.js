import { firestore } from '../../firebase/firebase.utils';

export const getAllPhoneTokens = async () => {
	let listUserPhoneTokens = [];
	const snapShot = await firestore.collection('users').get();
	snapShot.docs.map(
		(doc) =>
			doc.data().phoneToken && listUserPhoneTokens.push(doc.data().phoneToken)
	);

	listUserPhoneTokens = listUserPhoneTokens.filter(
		(e, i, a) => a.indexOf(e) === i
	);
	return listUserPhoneTokens;
};
