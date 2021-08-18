import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import {
	createUserProfileDocument,
	sendVerificationRequest,
	confirmCodeRequest,
	checkPhoneToken,
	removePhoneToken,
} from './authentication.service';
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const exceptedError = ['Error: Cancelled by user'];
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [verificationId, setVerificationId] = useState(null);
	const [processVerificationCode, setProcessVerificationCode] = useState(false);
	const [error, setError] = useState([]);

	useEffect(() => {
		const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			setIsLoading(true);
			if (user) {
				const userRef = await createUserProfileDocument(user, {
					role: 'user',
					customerType: 'New Customer',
					noCheckIn: 0,
					isNewCustomer: true,
					listDateCheckIn: [],
				});
				await userRef.onSnapshot(async (snapShot) => {
					const userObj = { id: snapShot.id, ...snapShot.data() };
					setUser({
						...userObj,
					});
					// const jsonValue = JSON.stringify(userObj);
					// await AsyncStorage.setItem(`@users`, jsonValue);
					// const value = AsyncStorage.getItem(`@users`);
					// value.then((result) => {
					// 	setUser(JSON.parse(result));
					// });
				});
				setIsLoading(false);
			}
			// } else {
			// 	// Offline
			// 	const value = AsyncStorage.getItem(`@users`);
			// 	value.then((result) => {
			// 		setUser(JSON.parse(result));
			// 	});
			// 	setIsLoading(false);
			// }
		});
		return () => {
			unsubscribe();
		};
	}, []);

	const checkPhoneTokenForUser = (user) => {
		checkPhoneToken(user);
	};

	const verificationPhoneNumber = (phoneNumber, recaptchaVerifier) => {
		setIsLoading(true);

		if (!phoneNumber) {
			return;
		}

		const POSTAL_CODE = '+358';
		phoneNumber = phoneNumber.toString();

		if (phoneNumber[0] === '0') {
			phoneNumber = phoneNumber.slice(1);
		}
		phoneNumber = `${POSTAL_CODE}${phoneNumber}`;

		sendVerificationRequest(phoneNumber, recaptchaVerifier)
			.then((id) => {
				setIsLoading(false);
				setVerificationId(id);
			})
			.catch((e) => {
				setIsLoading(false);
				if (e.toString() !== exceptedError[0]) {
					setError(e.toString());
				}
			});
	};

	const verificationCode = (code) => {
		if (!code) {
			return;
		}
		setProcessVerificationCode(true);
		confirmCodeRequest(verificationId, code)
			.then(() => {
				setProcessVerificationCode(false);
			})
			.catch((e) => {
				setProcessVerificationCode(false);
				if (e.toString() !== exceptedError[0]) {
					setError(e.toString());
				}
			});
	};

	const onLogout = async () => {
		await AsyncStorage.removeItem('@users');
		await removePhoneToken(user);
		await firebase.auth().signOut();
		setUser(null);
		setVerificationId(null);
		setError([]);
	};

	const clearError = () => {
		setError([]);
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: user,
				user,
				isLoading,
				error,
				onLogout,
				verificationPhoneNumber,
				verificationCode,
				checkPhoneTokenForUser,
				verificationId,
				clearError,
				processVerificationCode,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

// const onRegister = (email, password, repeatedPassword) => {
// 	setIsLoading(true);
// 	if (!email || !password || !repeatedPassword) {
// 		setError('All information is not empty!');
// 		return;
// 	}

// 	if (password !== repeatedPassword) {
// 		setError('Error: Passwords do not match');
// 		return;
// 	}

// 	firebase
// 		.auth()
// 		.createUserWithEmailAndPassword(email, password)
// 		.then((u) => {
// 			setUser(u);
// 			setIsLoading(false);
// 		})
// 		.catch(() => {
// 			setIsLoading(false);
// 			setError(e.toString());
// 		});
// };

// const onLogin = (email, password) => {
// 	setIsLoading(true);
// 	if (!email || !password) {
// 		setError('All information is not empty!');
// 		return;
// 	}

// 	loginRequest(email, password)
// 		.then((user) => {
// 			setUser(user);
// 			setIsLoading(false);
// 		})
// 		.catch((e) => {
// 			setIsLoading(false);
// 			setError(e.toString());
// 		});
// };
