import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import LottieView from 'lottie-react-native';
import { UserContext } from '../../../../services/user/user.context';
import { VoucherContext } from '../../../../services/voucher/voucher.context';

export const ScanQRCodeLoading = ({ navigation, route }) => {
	let animation = null;
	const [QRCode, setQRCode] = useState(route.params.QRCode);
	const {
		verifyVoucherByQRCode,
		allUserInfo,
		error,
		isVoucherError,
		isVoucherValid,
	} = useContext(VoucherContext);
	const { checkInForUser } = useContext(UserContext);

	useEffect(() => {
		if (QRCode) {
			let category_id = QRCode[QRCode.length - 1];
			if (category_id === '1') {
				checkInForUser();
			} else if (category_id === '2') {
				verifyVoucherByQRCode(QRCode);
			}
		}
	}, [QRCode]);

	useEffect(() => {
		if (isVoucherValid) {
			console.log('OK man: ', isVoucherValid);
		} else if (isVoucherError) {
			console.log('Error');
		}
	}, [isVoucherError, isVoucherValid]);

	useEffect(() => {
		animation.play();
	}, []);

	return (
		<SafeArea>
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
				<LottieView
					ref={(input) => {
						animation = input;
					}}
					key='animation'
					resizeMode='cover'
					duration={1500}
					style={{
						width: 300,
						height: 300,
					}}
					loop={false}
					source={require('../../../../../assets/8707-loading.json')}
				/>
			</View>
		</SafeArea>
	);
};
