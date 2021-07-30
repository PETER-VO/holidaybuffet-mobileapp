import React, { useState, createContext, useEffect } from 'react';
import firebase from 'firebase/app';
import {
	createUserProfileDocument,
	loginRequest,
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
	const [error, setError] = useState([]);

	if (!user) {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = await createUserProfileDocument(user, {
					role: 'user',
				});
				userRef.onSnapshot((snapShot) => {
					setUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		});
	}

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
		addFeedback;
		if (!code) {
			return;
		}

		confirmCodeRequest(verificationId, code)
			.then((result) => {
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				if (e.toString() !== exceptedError[0]) {
					setError(e.toString());
				}
			});
	};

	const onLogin = (email, password) => {
		setIsLoading(true);
		if (!email || !password) {
			setError('All information is not empty!');
			return;
		}

		loginRequest(email, password)
			.then((user) => {
				setUser(user);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				setError(e.toString());
			});
	};

	const incrementCredit = (data) => {
		incrementCreditRequest(data);
	};

	const onRegister = (email, password, repeatedPassword) => {
		setIsLoading(true);
		if (!email || !password || !repeatedPassword) {
			setError('All information is not empty!');
			return;
		}

		if (password !== repeatedPassword) {
			setError('Error: Passwords do not match');
			return;
		}

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((u) => {
				setUser(u);
				setIsLoading(false);
			})
			.catch(() => {
				setIsLoading(false);
				setError(e.toString());
			});
	};

	const onLogout = () => {
		setUser(null);
		setVerificationId(null);
		setError([]);
		firebase.auth().signOut();
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
				onLogin,
				onRegister,
				onLogout,
				verificationPhoneNumber,
				verificationCode,
				verificationId,
				clearError,
				incrementCredit,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
