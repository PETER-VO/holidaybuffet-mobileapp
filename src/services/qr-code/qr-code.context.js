import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from '../user/user.context';
import { VoucherContext } from '../voucher/voucher.context';
import { addAllUserInformation } from './qr-code.service';

export const QRCodeContext = createContext();

export const QRCodeContextProvider = ({ children }) => {
	const [error, setError] = useState([]);
	const [splittedQRCode, setSplittedQRCode] = useState([]);
	const [isVoucherValid, setIsVoucherValid] = useState(false);
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
	const { getAllVouchersByUserId, getVouchersByUserIdAndVoucherId } =
		useContext(VoucherContext);
	const { getAllFeedbacksByUserId, getUserByUserId } = useContext(UserContext);

	const refreshState = () => {
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

	const verifyVoucherByQRCode = (QRCode_) => {
		if (QRCode_) {
			const arrayCode = QRCode_.split(',');
			if (arrayCode.length === 3) {
				setSplittedQRCode(arrayCode);
			} else {
				throwErrorQRCodeNotValid();
			}
		}
	};

	useEffect(() => {
		if (splittedQRCode.length === 3) {
			setIsQRCodeValid(true);
			const userId = splittedQRCode[0];
			const voucherId = splittedQRCode[1];
			const voucher = getVouchersByUserIdAndVoucherId(userId, voucherId)
				.then((result) => {
					setVoucherByUserIdAndVoucherId(result);
				})
				.catch((e) => {
					throwErrorQRCodeNotValid('The voucher does not exist!');
				});
		}
	}, [splittedQRCode]);

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
		console.log('isQRCodeValid: ', isQRCodeValid);
		console.log('isVoucherError: ', isVoucherError);
		if (isQRCodeValid && (isVoucherValid || isVoucherError)) {
			getAllNeededUserInformationQRCodeScanning();
		}
	}, [isVoucherValid, isVoucherError, isQRCodeValid]);

	const getAllNeededUserInformationQRCodeScanning = () => {
		let userId = splittedQRCode[0];
		getUserByUserId(userId)
			.then((result) => {
				if (result) {
					setUserById(result);
				}
			})
			.catch((e) => {
				setError([
					...error,
					`QRCode Scan - User does not exist with user_id: ${userId} && errorMessage: ${e.message}`,
				]);
				setUserById({});
			});
		getAllFeedbacksByUserId(userId)
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
		getAllVouchersByUserId(userId)
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
			addAllUserInformationAfterScanQRCode({
				...neededData,
				usedVouchers: { ...voucherByUserIdAndVoucherId },
				status: true,
				title: 'Successfully scanned voucher',
				errors: error.toString(),
			});
			updateListCheckInByUser(userById);
			setDoneVerifyScannedVoucher(true);
			setNeededData(null);
		}
	}, [isVoucherValid, neededData]);

	useEffect(() => {
		if (isVoucherError && neededData) {
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

	return (
		<QRCodeContext.Provider
			value={{
				refreshState,
				throwErrorQRCodeNotValid,
				verifyVoucherByQRCode,
				doneVerifyScannedVoucher,
				isVoucherError,
				isVoucherValid,
			}}
		>
			{children}
		</QRCodeContext.Provider>
	);
};
