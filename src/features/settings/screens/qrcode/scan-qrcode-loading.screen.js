import React, { useEffect, useContext, useState } from 'react';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import LottieView from 'lottie-react-native';
import { UserContext } from '../../../../services/user/user.context';
import { VoucherContext } from '../../../../services/voucher/voucher.context';
import { ActivityIndicator, Colors } from 'react-native-paper';

export const ScanQRCodeLoading = ({ navigation, route }) => {
	const [QRCode, setQRCode] = useState(route.params.QRCode);
	const [isVerifyDone, setIsVerifyDone] = useState(false);
	const {
		verifyVoucherByQRCode,
		allUserInfo,
		error,
		resetVoucherContext,
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
		if (isVoucherValid && allUserInfo) {
			setTimeout(() => {
				navigation.navigate('ScanSuccess');

				resetVoucherContext();
			}, 3000);
		} else if (isVoucherError) {
			setTimeout(() => {
				console.log('Error');
			}, 3000);
		}
	}, [isVoucherValid, isVoucherError, allUserInfo]);

	return (
		<SafeArea
			style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
		>
			<ActivityIndicator animating={true} size={50} color={Colors.blue300} />
		</SafeArea>
	);
};
