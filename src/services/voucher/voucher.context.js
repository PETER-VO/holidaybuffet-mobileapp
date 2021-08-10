import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import { NotificationContext } from '../notification/notification.context';
import { UserContext } from '../user/user.context';
import {
	addVoucherToUserId,
	getVouchersByUserIdRequest,
	deleteVoucherByUserId,
	getVouchersByUserIdAndVoucherId,
	getListScannedUserRequest,
} from './voucher.service';

export const VoucherContext = createContext();

export const VoucherContextProvider = ({ children }) => {
	const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);
	const [isLoadingTest, setIsLoadingTest] = useState(false);
	const [isLoadingPublish, setIsLoadingPublish] = useState(false);
	const [filteredCheckIns, setFilteredCheckIns] = useState([]);
	const [level, setLevel] = useState('');
	const [error, setError] = useState('');
	const [vouchers, setVouchers] = useState([]);
	const [voucherByUserIdAndVoucherId, setVoucherByUserIdAndVoucherId] =
		useState(null);
	const [quantity, setQuantity] = useState(0);
	const [isVoucherValid, setIsVoucherValid] = useState(false);
	const [isVoucherError, setIsVoucherError] = useState(false);
	const [userInfoById, setUserInfoById] = useState(null);
	const [allUserInfo, setAllUserInfo] = useState(null);
	const [feedbacksUserId, setFeedbacksUserId] = useState(null);
	const [voucherUserId, setVoucherUserId] = useState(null);
	const [QRCode, setQRCode] = useState('');
	const [listScannedUser, setListScannedUser] = useState([]);
	const {
		users,
		getUserByUserId,
		getAllFeedBackByUserId,
		addAllUserInformationAfterScanQRCode,
		getAllUsers,
	} = useContext(UserContext);
	const { user } = useContext(AuthenticationContext);

	useEffect(() => {
		setQuantity(filteredCheckIns.length);
	}, [filteredCheckIns]);

	useEffect(() => {
		getVouchersByUserIdOnPhone();
		getAllListsScanUser();
	}, []);

	const getAllListsScanUser = () => {
		getListScannedUserRequest()
			.then((results) => {
				setListScannedUser(results);
			})
			.catch((e) => {
				console.log('Error get all list scan ', e.message);
			});
	};

	const deleteVoucher = (voucherId) => {
		deleteVoucherByUserId(user.id, voucherId);
	};

	const checkInLevel = (count) => {
		if (count >= 11) {
			return 'Premium Customer';
		} else if (count >= 5) {
			return 'Loyal Customer';
		}
		return 'New Customer';
	};

	const addVoucherToUserForTesting = (voucher) => {
		setIsLoadingTest(true);
		try {
			addVoucherToUserId(user.id, voucher);
		} catch (e) {
			console.log('Error adding test voucher');
		}
		setTimeout(() => {
			setIsLoadingTest(false);
		}, 2500);
	};

	const addVoucherToUsers = (voucher) => {
		setIsLoadingPublish(true);
		try {
			if (voucher && filteredCheckIns.length !== 0) {
				filteredCheckIns.map((user) => addVoucherToUserId(user.id, voucher));
			}
		} catch (e) {
			console.log('Error adding voucher: ', e.message);
		}

		setTimeout(() => {
			setIsLoadingPublish(false);
		}, 2500);
	};

	const verifyVoucherByQRCode = async (QRCode_) => {
		if (QRCode_) {
			setQRCode(QRCode_);
			const arrayCode = QRCode_.split(',');
			console.log('arrayCode ', arrayCode);
			const userId = arrayCode[0];
			const voucherId = arrayCode[1];
			await getVouchersByUserIdAndVoucherId(userId, voucherId)
				.then((result) => {
					setVoucherByUserIdAndVoucherId(result);
				})
				.catch((e) => {
					setError('The voucher does not exist!');
					setIsVoucherError(true);
				});
		}
	};

	useEffect(() => {
		if (voucherByUserIdAndVoucherId) {
			let currentDate = new Date();
			let userDate = voucherByUserIdAndVoucherId['expiredDate'].split('/');
			let expiredDate = new Date(userDate[2], userDate[1] - 1, userDate[0]); // new Date(year, month, date).

			if (currentDate.getTime() < expiredDate.getTime()) {
				setIsVoucherValid(true);
			} else {
				setError('The voucher is expired!');
				setIsVoucherError(true);
			}
		}
	}, [voucherByUserIdAndVoucherId]);

	const updateListDateCheckInForUser = (user) => {
		console.log('Hei!', user);
	};

	useEffect(() => {
		if (isVoucherValid && QRCode) {
			let userId = QRCode.split(',')[0];
			getUserByUserId(userId)
				.then((result) => {
					updateListDateCheckInForUser(result);
					setUserInfoById(result);
				})
				.catch((e) => {
					setError('User does not exist!');
					setIsVoucherError(true);
				});
			getAllFeedBackByUserId(userId)
				.then((result) => {
					setFeedbacksUserId(result);
				})
				.catch((e) => {
					setError('Can not get all feedbacks from userId!');
					setIsVoucherError(true);
				});
			getVouchersByUserId(userId);
		}
	}, [isVoucherValid]);

	useEffect(() => {
		if (
			userInfoById &&
			voucherByUserIdAndVoucherId &&
			feedbacksUserId &&
			voucherUserId
		) {
			setAllUserInfo({
				userInfo: { ...userInfoById },
				usedVouchers: { ...voucherByUserIdAndVoucherId },
				existedVouchers: { ...voucherUserId },
				feedback: { ...feedbacksUserId },
			});
		}
	}, [
		voucherByUserIdAndVoucherId,
		userInfoById,
		feedbacksUserId,
		voucherUserId,
	]);

	const getVouchersByUserIdOnPhone = () => {
		getVouchersByUserIdRequest(user.id)
			.then((results) => {
				setVouchers(results);
			})
			.catch((e) => console.log('Error loading vouchers ', e.message));
	};

	const getVouchersByUserId = (userId) => {
		getVouchersByUserIdRequest(userId)
			.then((results) => {
				setVoucherUserId(results);
			})
			.catch((e) => console.log('Error loading vouchers ', e.message));
	};

	const filterUsersByCheckInNumber = (num_1, num_2) => {
		setIsLoadingQuantity(true);
		let type = checkInLevel(num_1);
		setLevel(type);
		setTimeout(() => {
			if (users.length !== 0) {
				if (!num_1 && !num_2) {
					setIsLoadingQuantity(false);
					setFilteredCheckIns(users);
					return;
				}
				let filteredUsers = users.filter((user) => {
					let check_1 = false;
					let check_2 = false;
					let check = false;
					if (num_1) {
						NotificationContext;
						check_1 = user['noCheckIn'] >= num_1;
					}
					if (num_2) {
						check_2 = user['noCheckIn'] <= num_2;
					} else {
						check_2 = true;
					}
					if (check_1 && check_2) {
						check = true;
					}
					return check;
				});
				setFilteredCheckIns(filteredUsers);
			}
			setIsLoadingQuantity(false);
		}, 2400);
	};

	useEffect(() => {
		if (isLoadingQuantity) {
			getAllUsers();
		}
	}, [isLoadingQuantity]);

	const resetVoucherContext = () => {
		setIsLoadingQuantity(false);
		setIsLoadingTest(false);
		setIsLoadingPublish(false);
		setVoucherByUserIdAndVoucherId(null);
		setIsVoucherValid(false);
		setIsVoucherError(false);
		setAllUserInfo(null);
		setUserInfoById(null);
		setFeedbacksUserId(null);
		setVoucherUserId(null);
		setQRCode('');
	};

	return (
		<VoucherContext.Provider
			value={{
				filterUsersByCheckInNumber,
				addVoucherToUserForTesting,
				addVoucherToUsers,
				quantity,
				isLoadingQuantity,
				level,
				isLoadingTest,
				isLoadingPublish,
				filteredCheckIns,
				vouchers,
				deleteVoucher,
				getVouchersByUserIdOnPhone,
				verifyVoucherByQRCode,
				error,
				isVoucherError,
				isVoucherValid,
				allUserInfo,
				resetVoucherContext,
			}}
		>
			{children}
		</VoucherContext.Provider>
	);
};
