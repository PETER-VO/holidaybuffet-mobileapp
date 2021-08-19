import { firestore } from '../../firebase/firebase.utils';

export const getAllMarketingRequest = async () => {
	const results = [];
	const marketingRef = firestore.collection(`marketings`);
	const snapshot = await marketingRef.orderBy('valid', 'asc').get();
	snapshot.forEach((doc) => {
		results.push({
			id: doc.id,
			...doc.data(),
		});
	});
	return results;
};

export const getMenuURLRequest = async () => {
	let results = null;
	const menuRef = firestore.collection(`menu`);
	const snapshot = await menuRef.get();
	snapshot.forEach((doc) => {
		results = {
			id: doc.id,
			...doc.data(),
		};
	});
	return results;
};

export const createFeedback = async (userAuth, feedback) => {
	try {
		const createdAt = new Date();
		return firestore
			.collection(`users/${userAuth.id}/feedbacks`)
			.add({ createdAt, ...feedback });
	} catch (e) {
		console.log('error creating feedback', e.message);
	}
};
