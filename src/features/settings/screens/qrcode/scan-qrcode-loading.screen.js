import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import LottieView from 'lottie-react-native';
import { QRCodeContext } from '../../../../services/qr-code/qr-code.context';

export const ScanQRCodeLoading = ({ navigation, route }) => {
	let animation = null;
	const [QRCode, setQRCode] = useState(route.params.QRCode);
	const {
		isVoucherError,
		isVoucherValid,
		throwErrorQRCodeNotValid,
		verifyVoucherByQRCode,
		doneVerifyScannedVoucher,
		verifyQRCodeForUserCheckIn,
		isCheckInSuccess,
	} = useContext(QRCodeContext);

	useEffect(() => {
		if (QRCode) {
			let category_id = QRCode[QRCode.length - 1];
			if (category_id === '1') {
				verifyQRCodeForUserCheckIn(QRCode);
			} else if (category_id === '2') {
				verifyVoucherByQRCode(QRCode);
			} else {
				throwErrorQRCodeNotValid(`QRCode is not valid! ${QRCode}`);
			}
		}
	}, [QRCode]);

	useEffect(() => {
		setTimeout(() => {
			if (isVoucherValid && doneVerifyScannedVoucher) {
				navigation.navigate('ScanSuccess', { scanCategory_id: 2 });
			} else if (isVoucherError && doneVerifyScannedVoucher) {
				navigation.navigate('ScanFailed');
			} else if (isCheckInSuccess && doneVerifyScannedVoucher) {
				navigation.navigate('ScanSuccess', { scanCategory_id: 1 });
			}
		}, 3000);
	}, [isVoucherValid, isVoucherError, doneVerifyScannedVoucher]);

	useEffect(() => {
		animation.play();
	}, []);

	return (
		<SafeArea>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					backgroundColor: '#38c172',
				}}
			>
				<LottieView
					ref={(input) => {
						animation = input;
					}}
					key='animation'
					resizeMode='cover'
					duration={1000}
					style={{
						width: 400,
						height: 400,
					}}
					source={require('../../../../../assets/loading-round-1.json')}
				/>
			</View>
		</SafeArea>
	);
};
