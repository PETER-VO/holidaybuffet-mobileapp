import React, {
	useState,
	createContext,
	useEffect,
	useContext,
	useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebase from 'firebase';
import {
	createUserProfileDocument,
	sendVerificationRequest,
	confirmCodeRequest,
	checkPhoneToken,
	removePhoneToken,
	getUserRefByUserId,
} from './authentication.service';
import { UserContext } from '../user/user.context';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
	const exceptedError = ['Error: Cancelled by user'];
	const [isLoading, setIsLoading] = useState(false);
	const [user, setUser] = useState(null);
	const [verificationId, setVerificationId] = useState(null);
	const [processVerificationCode, setProcessVerificationCode] = useState(false);
	const [error, setError] = useState([]);
	const [isDoneLogin, setIsDoneLogin] = useState(false);
	const [myFunction, setMyFunction] = useState(null);

	const onAuth = async (user) => {
		const userRef = await createUserProfileDocument(user, {
			role: 'user',
			customerType: 'New Customer',
			noCheckIn: 0,
			isNewCustomer: true,
			listDateCheckIn: [],
		});
		subscribeUserSnapShot(userRef);
	};

	const subscribeUserSnapShot = async (userRef) => {
		const unsubscribe = await userRef.onSnapshot(async (snapShot) => {
			if (snapShot.data()) {
				const userObj = { id: snapShot.id, ...snapShot.data() };
				setUser({
					...userObj,
				});
				setIsDoneLogin(true);
				const jsonValue = JSON.stringify(userObj);
				await AsyncStorage.setItem(`@users`, jsonValue);
			}
		});
		setMyFunction(() => unsubscribe);
	};

	useEffect(() => {
		if (!user) {
			AsyncStorage.getItem(`@users`).then((value) => {
				if (value) {
					const userJsonParse = JSON.parse(value);
					setUser(userJsonParse);
					const userRef = getUserRefByUserId(userJsonParse.id);
					subscribeUserSnapShot(userRef);
				}
			});
		}
	}, []);

	useEffect(() => {
		if (user && isDoneLogin) {
			checkPhoneToken(user);
			setIsDoneLogin(false);
		}
	}, [user, isDoneLogin]);

	const verificationPhoneNumber = (phoneNumber, recaptchaVerifier) => {
		setIsLoading(true);

		if (!phoneNumber) {
			return;
			user;
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
			.then(async (result) => {
				await onAuth(result);
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
		// if (myFunction) {
		// 	await myFunction();
		// }
		// await removePhoneToken(user);
		// await AsyncStorage.removeItem('@users');
		// await firebase.auth().signOut();
		setUser(null);
		setVerificationId(null);
		setError([]);
	};

	const clearError = () => {
		setError([]);
	};

	const removePhoneTokenForUser = (user) => {
		return removePhoneToken(user);
	};

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated: !!user,
				user,
				isLoading,
				error,
				onLogout,
				verificationPhoneNumber,
				verificationCode,
				verificationId,
				clearError,
				processVerificationCode,
				removePhoneTokenForUser,
				setUser,
				isDoneLogin,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};
