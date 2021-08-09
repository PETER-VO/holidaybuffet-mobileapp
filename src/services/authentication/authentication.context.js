import React, { useState, createContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import {
	createUserProfileDocument,
	sendVerificationRequest,
	confirmCodeRequest,
	incrementCreditRequest,
} from './authentication.service';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const exceptedError = ['Error: Cancelled by user'];
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [verificationId, setVerificationId] = useState(null);
	const [processVerificationCode, setProcessVerificationCode] = useState(false);
	const [checkVerificationCode, setCheckVerificationCode] = useState(false);
	const [error, setError] = useState([]);

	if (!user) {
		const value = AsyncStorage.getItem(`@users`);
		value.then((result) => {
			setUser(JSON.parse(result));
		});
	}

	useEffect(() => {
		console.log(user);
	}, [user]);

	const saveUserToFirebase = () => {
		if (!user) {
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					const userRef = await createUserProfileDocument(user, {
						role: 'user',
					});
					await userRef.onSnapshot(async (snapShot) => {
						const userObj = { id: snapShot.id, ...snapShot.data() };
						setUser({
							userObj,
						});
						const jsonValue = JSON.stringify(userObj);
						await AsyncStorage.setItem(`@users`, jsonValue);
					});
					setIsLoading(false);
					setCheckVerificationCode(false);
				} else {
					console.log('Cannot connect to firebase to get user!');
					setIsLoading(false);
				}
			});
		}
	};

	const verificationPhoneNumber = (phoneNumber, recaptchaVerifier) => {
		setIsLoading(true);

		if (!phoneNumber) {
			return;
		}

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
		setIsLoading(true);
		if (!code) {
			return;
		}
		setProcessVerificationCode(true);
		setTimeout(() => {
			confirmCodeRequest(verificationId, code)
				.then(() => {
					setCheckVerificationCode(true);
					setProcessVerificationCode(false);
				})
				.catch((e) => {
					setProcessVerificationCode(false);
					if (e.toString() !== exceptedError[0]) {
						setError(e.toString());
					}
				});
		}, 2000);
	};

	const incrementCredit = (data) => {
		incrementCreditRequest(data);
	};

	const onLogout = () => {
		AsyncStorage.removeItem('@users');
		firebase.auth().signOut();
		setUser(null);
		setVerificationId(null);
		setError([]);
	};

	const clearError = () => {
		setError([]);
	};

	const verifyCheckInForUser = () => {
		console.log('1');
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
				verificationId,
				clearError,
				incrementCredit,
				processVerificationCode,
				checkVerificationCode,
				saveUserToFirebase,
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
