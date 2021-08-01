import React, { useState, createContext } from 'react';
import * as firebase from 'firebase';
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
	const [tokenAuthPhone, setTokenAuthPhone] = useState(null);
	const [processVerificationCode, setProcessVerificationCode] = useState(false);
	const [error, setError] = useState([]);

	if (!user) {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				const userRef = await createUserProfileDocument(user, {
					role: 'user',
				});
				await userRef.onSnapshot((snapShot) => {
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
		if (!code) {
			return;
		}
		setProcessVerificationCode(true);
		setTimeout(() => {
			confirmCodeRequest(verificationId, code)
				.then((result) => {
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
		firebase.auth().signOut();
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
				onLogin,
				onRegister,
				onLogout,
				verificationPhoneNumber,
				verificationCode,
				verificationId,
				clearError,
				incrementCredit,
				processVerificationCode,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
