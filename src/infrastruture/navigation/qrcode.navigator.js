import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { QRCodeScreen } from '../../features/qrcode/qrcode.screen';
import { ScanQRCode } from '../../features/qrcode/scan-qrcode.screen';
import { ScanSuccessScreen } from '../../features/qrcode/scan-success.screen';
import { ShowUserInformScreen } from '../../features/qrcode/show-user-inform.screen';

const qrcodeStack = createStackNavigator();

export const QRCodeNavigator = () => {
	return (
		<qrcodeStack.Navigator
			headerMode='none'
			screenOptions={{
				CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			<qrcodeStack.Screen name='QRCodeScreen' component={QRCodeScreen} />
			<qrcodeStack.Screen name='ScanQRCode' component={ScanQRCode} />
			<qrcodeStack.Screen name='ScanSuccess' component={ScanSuccessScreen} />
			<qrcodeStack.Screen
				name='UserInformByQRCode'
				component={ShowUserInformScreen}
			/>
		</qrcodeStack.Navigator>
	);
};
