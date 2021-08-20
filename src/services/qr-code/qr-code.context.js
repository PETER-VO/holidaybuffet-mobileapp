import React, { createContext, useState, useEffect, useContext } from 'react';
import { NotificationContext } from '../notification/notification.context';
import { UserContext } from '../user/user.context';
import { VoucherContext } from '../voucher/voucher.context';
import {
	addAllUserInformation,
	deleteAllScannedUserListRequest,
} from './qr-code.service';

export const QRCodeContext = createContext();

export const QRCodeContextProvider = ({ children }) => {
	const [error, setError] = useState([]);
	const [splittedQRCode, setSplittedQRCode] = useState([]);
	const [isVoucherValid, setIsVoucherValid] = useState(false);
	const [isCheckInSuccess, setIsCheckInSuccess] = useState(false);
	const [isVoucherError, setIsVoucherError] = useState(false);
	const [voucherByUserIdAndVoucherId, setVoucherByUserIdAndVoucherId] =
		useState(null);
	const [userById, setUserById] = useState(null);
	const [feedbacksByUserId, setFeedbacksByUserId] = useState(null);
	const [vouchersByUserId, setVouchersByUserId] = useState(null);
	const [doneVerifyScannedVoucher, setDoneVerifyScannedVoucher] =
		useState(false);
	const [isQRCodeValid, setIsQRCodeValid] = useState(false);
	const [neededData, setNeededData] = useState(null);

	const { updateListCheckInByUser } = useContext(UserContext);
	const {
		getAllVouchersByUserId,
		getVouchersByUserIdAndVoucherId,
		deleteVoucherByUserIdAndVoucherId,
	} = useContext(VoucherContext);
	const { getAllFeedbacksByUserId, getUserByUserId } = useContext(UserContext);
	const { sendNotificationForUser } = useContext(NotificationContext);

	const refreshState = () => {
		setIsCheckInSuccess(false);
		setIsVoucherError(false);
		setIsVoucherValid(false);
		setIsQRCodeValid(false);
		setError([]);
		setSplittedQRCode([]);
		setFeedbacksByUserId(null);
		setVouchersByUserId(null);
		setUserById(null);
		setDoneVerifyScannedVoucher(false);
	};

	const throwErrorQRCodeNotValid = (errorStr) => {
		setError([...error, errorStr]);
		setIsQRCodeValid(false);
		setIsVoucherError(true);
		setFeedbacksByUserId({});
		setVouchersByUserId({});
		setUserById({});
	};

	//Verify Check-in
	const verifyQRCodeForUserCheckIn = (QRCode_) => {
		if (QRCode_ && QRCode_.split(',').length == 2) {
			setIsQRCodeValid(true);
			const arrayCode = QRCode_.split(',');
			setSplittedQRCode(arrayCode);
			getUserByUserId(arrayCode[0])
				.then(async (result) => {
					console.log('result: ', result);
					await updateListCheckInByUser(result)
						.then((userObj) => {
							setUserById(userObj);
							setIsCheckInSuccess(true);
						})
						.catch((e) => {
							throwErrorQRCodeNotValid(`Update Failed!`);
						});
				})
				.catch((e) => {
					throwErrorQRCodeNotValid(`Not Found!`);
				});
		} else {
			throwErrorQRCodeNotValid(`QRCode is not valid: ${QRCode_}`);
		}
	};

	// Verify Voucher * Start
	const verifyVoucherByQRCode = (QRCode_) => {
		if (QRCode_) {
			const arrayCode = QRCode_.split(',');
			if (arrayCode.length === 3) {
				setSplittedQRCode(arrayCode);
			} else {
				throwErrorQRCodeNotValid(`QRCode is not valid`);
			}
		}
	};

	useEffect(() => {
		if (splittedQRCode.length === 3) {
			setIsQRCodeValid(true);
			const userId = splittedQRCode[0];
			const voucherId = splittedQRCode[1];
			getVouchersByUserIdAndVoucherId(userId, voucherId)
				.then((result) => {
					setVoucherByUserIdAndVoucherId(result);
				})
				.catch((e) => {
					throwErrorQRCodeNotValid('The voucher does not exist!');
				});
		}
	}, [splittedQRCode]);

	useEffect(() => {
		async function asyncFunction() {
			if (voucherByUserIdAndVoucherId) {
				let currentDate = new Date();
				let userDate = voucherByUserIdAndVoucherId['expiredDate'];
				let expiredDate = new Date(userDate.seconds * 1000);
				let check = true;
				if (currentDate.getTime() > expiredDate.getTime()) {
					setError([...error, 'The voucher is expired!']);
					setIsVoucherError(true);
					check = false;
				}

				if (voucherByUserIdAndVoucherId.hasOwnProperty('checkIn')) {
					let userId = splittedQRCode[0];
					await getUserByUserId(userId).then((user) => {
						setUserById(user);
						if (user.noCheckIn < voucherByUserIdAndVoucherId.checkIn) {
							setError([
								...error,
								`User: ${user.noCheckIn} check-in < voucher:${voucherByUserIdAndVoucherId.checkIn} check-in`,
							]);
							setIsVoucherError(true);
							check = false;
						}
					});
				}

				if (check) {
					setIsVoucherValid(true);
				}
			}
		}
		asyncFunction();
	}, [voucherByUserIdAndVoucherId]);

	useEffect(() => {
		if (
			isQRCodeValid &&
			(isVoucherValid || isVoucherError || isCheckInSuccess)
		) {
			getAllNeededUserInformationQRCodeScanning();
		}
	}, [isVoucherValid, isVoucherError, isQRCodeValid, isCheckInSuccess]);

	const getAllNeededUserInformationQRCodeScanning = async () => {
		let userId = splittedQRCode[0];
		if (!userById) {
			await getUserByUserId(userId)
				.then(async (result) => {
					await updateListCheckInByUser(result)
						.then((userObj) => {
							setUserById(userObj);
						})
						.catch((e) => {
							setUserById({});
						});
				})
				.catch((e) => {
					setError([
						...error,
						`QRCode Scan - User does not exist with user_id: ${userId} && errorMessage: ${e.message}`,
					]);
					setUserById({});
				});
		}
		await getAllFeedbacksByUserId(userId)
			.then((result) => {
				setFeedbacksByUserId(result);
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - Can not get all feedbacks from userId:  ${userId} && errorMessage: ${e.message}`,
				]);
				setFeedbacksByUserId({});
			});
		await getAllVouchersByUserId(userId)
			.then((results) => {
				setVouchersByUserId(results);
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - Error loading vouchers  userId:  ${userId} && errorMessage: ${e.message}`,
				]);
				setVouchersByUserId({});
			});
	};

	useEffect(() => {
		if (userById && feedbacksByUserId && vouchersByUserId) {
			setNeededData({
				userInfo: { ...userById },
				existedVouchers: { ...vouchersByUserId },
				feedbacks: { ...feedbacksByUserId },
			});
		}
	}, [userById, feedbacksByUserId, vouchersByUserId]);

	useEffect(() => {
		if (isVoucherValid && neededData) {
			async function asyncFunction() {
				await deleteVoucherByUserIdAndVoucherId(
					userById.id,
					voucherByUserIdAndVoucherId.id
				);
				await addAllUserInformationAfterScanQRCode({
					...neededData,
					usedVouchers: { ...voucherByUserIdAndVoucherId },
					status: true,
					title: 'Successfully scanned voucher',
					errors: error.toString(),
				});
				sendNotificationForUser(
					userById,
					'Success!',
					'Thank you for your coming! Have a nice day!'
				);
				setDoneVerifyScannedVoucher(true);
				setNeededData(null);
			}
			asyncFunction();
		}
	}, [isVoucherValid, neededData]);

	useEffect(() => {
		if (isVoucherError && neededData) {
			console.log('Ok');
			addAllUserInformationAfterScanQRCode({
				...neededData,
				status: false,
				title: 'Failed scanned voucher',
				errors: error.toString(),
			});
			setDoneVerifyScannedVoucher(true);
			setNeededData(null);
		}
	}, [isVoucherError, neededData]);

	const addAllUserInformationAfterScanQRCode = (information) => {
		addAllUserInformation(information);
	};

	// Verify Voucher * End

	//Check in
	useEffect(() => {
		if (isCheckInSuccess && neededData) {
			async function asyncFunction() {
				await addAllUserInformationAfterScanQRCode({
					...neededData,
					status: true,
					title: 'Successfully Check-In',
					errors: error.toString(),
				});
				sendNotificationForUser(
					userById,
					'Success!',
					'Thank you for your coming! Have a nice day!'
				);
				setDoneVerifyScannedVoucher(true);
				setNeededData(null);
			}
			asyncFunction();
		}
	}, [isCheckInSuccess, neededData]);

	const deleteAllScannedUserList = () => {
		deleteAllScannedUserListRequest();
	};

	return (
		<QRCodeContext.Provider
			value={{
				refreshState,
				throwErrorQRCodeNotValid,
				verifyVoucherByQRCode,
				verifyQRCodeForUserCheckIn,
				deleteAllScannedUserList,
				doneVerifyScannedVoucher,
				isVoucherError,
				isVoucherValid,
				isCheckInSuccess,
			}}
		>
			{children}
		</QRCodeContext.Provider>
	);
};
