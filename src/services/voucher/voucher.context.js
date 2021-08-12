import React, { useState, useEffect, createContext, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import { NotificationContext } from '../notification/notification.context';
import { UserContext } from '../user/user.context';
import {
	addVoucherToUserId,
	getVouchersByUserIdRequest,
	deleteVoucherByUserId,
	getVouchersByUserIdAndVoucherId,
} from './voucher.service';

export const VoucherContext = createContext();

export const VoucherContextProvider = ({ children }) => {
	const [error, setError] = useState([]);
	const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);
	const [isLoadingTest, setIsLoadingTest] = useState(false);
	const [isLoadingPublish, setIsLoadingPublish] = useState(false);
	const [filteredCheckIns, setFilteredCheckIns] = useState([]);
	const [level, setLevel] = useState('');
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
	const [neededUserInfo, setNeededUserInfo] = useState(null);
	const [QRCode, setQRCode] = useState('');
	const [doneVerifyScannedVoucher, setDoneVerifyScannedVoucher] =
		useState(false);
	const [isQRCodeValid, setIsQRCodeValid] = useState(false);
	const {
		users,
		getUserByUserId,
		getAllFeedBackByUserId,
		addAllUserInformationAfterScanQRCode,
		updateListCheckInByUser,
		getAllUsers,
	} = useContext(UserContext);
	const { user } = useContext(AuthenticationContext);

	useEffect(() => {
		setQuantity(filteredCheckIns.length);
	}, [filteredCheckIns]);

	useEffect(() => {
		getVouchersByUserIdOnPhone();
	}, []);

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

	// Start QRCode
	const checkQRCodeValid = (QRCode_) => {
		setError([]);
		if (QRCode_) {
			const arrayCode = QRCode_.split(',');
			if (
				arrayCode.length === 3 &&
				Number.isInteger(parseInt(arrayCode[arrayCode.length - 1]))
			) {
				setQRCode(QRCode_);
				setIsQRCodeValid(true);
				return;
			}
		}
		setError([...error, `QRCode {${QRCode_}} is not valid!`]);
		setQRCode('');
		setFeedbacksUserId({});
		setVoucherUserId({});
		setUserInfoById({});
		setIsVoucherError(true);
	};

	const verifyVoucherByQRCode = async (QRCode_) => {
		if (QRCode_) {
			const arrayCode = QRCode_.split(',');
			const userId = arrayCode[0];
			const voucherId = arrayCode[1];
			await getVouchersByUserIdAndVoucherId(userId, voucherId)
				.then((result) => {
					setVoucherByUserIdAndVoucherId(result);
				})
				.catch((e) => {
					setError([...error, 'The voucher does not exist!']);
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
				setError([...error, 'The voucher is expired!']);
				setIsVoucherError(true);
			}
		}
	}, [voucherByUserIdAndVoucherId]);

	useEffect(() => {
		if (isQRCodeValid && (isVoucherValid || isVoucherError)) {
			getAllNeededUserInformationQRCodeScanning();
		}
	}, [isVoucherValid, isVoucherError, isQRCodeValid]);

	const getAllNeededUserInformationQRCodeScanning = () => {
		let userId = QRCode.split(',')[0];
		console.log('userId ', userId);
		getUserByUserId(userId)
			.then((result) => {
				setUserInfoById(result);
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - User does not exist with user_id: ${userId} && errorMessage: ${e.message}`,
				]);
				setUserInfoById({});
			});
		getAllFeedBackByUserId(userId)
			.then((result) => {
				setFeedbacksUserId(result);
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - Can not get all feedbacks from userId:  ${userId} && errorMessage: ${e.message}`,
				]);
				setFeedbacksUserId({});
			});
		getVouchersByUserId(userId);
	};

	const getVouchersByUserId = (userId) => {
		getVouchersByUserIdRequest(userId)
			.then((results) => {
				setVoucherUserId(results);
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - Error loading vouchers  userId:  ${userId} && errorMessage: ${e.message}`,
				]);
				setVoucherUserId({});
			});
	};

	useEffect(() => {
		if (userInfoById && feedbacksUserId && voucherUserId) {
			console.log('Yeah 1');
			setNeededUserInfo({
				userInfo: { ...userInfoById },
				existedVouchers: { ...voucherUserId },
				feedbacks: { ...feedbacksUserId },
			});
		}
	}, [userInfoById, feedbacksUserId, voucherUserId]);

	useEffect(() => {
		console.log(isVoucherValid);
		if (isVoucherValid && neededUserInfo) {
			console.log('Yeah 2');
			updateListCheckInByUser(userInfoById);
			addAllUserInformationAfterScanQRCode({
				...neededUserInfo,
				usedVouchers: { ...voucherByUserIdAndVoucherId },
				status: true,
				title: 'Successfully scanned voucher',
				errors: error.toString(),
			});
			setError([]);
			setDoneVerifyScannedVoucher(true);
			setNeededUserInfo(null);
		}
	}, [isVoucherValid, neededUserInfo]);

	useEffect(() => {
		if (isVoucherError && neededUserInfo) {
			addAllUserInformationAfterScanQRCode({
				...neededUserInfo,
				status: false,
				title: 'Failed scanned voucher',
				errors: error.toString(),
			});
			setError([]);
			setDoneVerifyScannedVoucher(true);
			setNeededUserInfo(null);
		}
	}, [isVoucherError, neededUserInfo]);

	//End QRCode Scan

	const getVouchersByUserIdOnPhone = () => {
		getVouchersByUserIdRequest(user.id)
			.then((results) => {
				setVouchers(results);
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

	const resetStateBeforeVerifyingQRCode = () => {
		setDoneVerifyScannedVoucher(false);
		setIsVoucherValid(false);
		setIsVoucherError(false);
		setError([]);
		setVoucherByUserIdAndVoucherId(null);
		setFeedbacksUserId(null);
		setVoucherUserId(null);
		setAllUserInfo(null);
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
				checkQRCodeValid,
				isVoucherError,
				isVoucherValid,
				allUserInfo,
				doneVerifyScannedVoucher,
				resetStateBeforeVerifyingQRCode,
			}}
		>
			{children}
		</VoucherContext.Provider>
	);
};
