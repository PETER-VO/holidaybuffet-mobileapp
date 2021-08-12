import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import LottieView from 'lottie-react-native';
import { UserContext } from '../../../../services/user/user.context';
import { VoucherContext } from '../../../../services/voucher/voucher.context';
export const ScanQRCodeLoading = ({ navigation, route }) => {
	let animation = null;
	const [QRCode, setQRCode] = useState(route.params.QRCode);
	const [isQRCodeNotValid, setIsQRCodeNotValid] = useState(false);
	const {
		verifyVoucherByQRCode,
		allUserInfo,
		isVoucherError,
		isVoucherValid,
		doneVerifyScannedVoucher,
		checkQRCodeValid,
	} = useContext(VoucherContext);

	const { checkInForUser } = useContext(UserContext);

	useEffect(() => {
		if (QRCode) {
			console.log('QRCode: ', QRCode);
			checkQRCodeValid(QRCode);
			let category_id = QRCode[QRCode.length - 1];
			if (category_id === '1') {
				checkInForUser();
			} else if (category_id === '2') {
				verifyVoucherByQRCode(QRCode);
			}
		}
	}, [QRCode]);

	useEffect(() => {
		setTimeout(() => {
			if (isVoucherValid && doneVerifyScannedVoucher) {
				navigation.navigate('ScanSuccess');
			} else if (isVoucherError && doneVerifyScannedVoucher) {
				navigation.navigate('ScanFailed');
			}
		}, 4000);
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
