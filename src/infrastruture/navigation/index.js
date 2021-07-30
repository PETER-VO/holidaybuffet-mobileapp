import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { Text } from 'react-native';
import { QRCodeScreen } from '../../features/qrcode/qrcode.screen';
import { ScanQRCode } from '../../features/qrcode/scan-qrcode.screen';
import { ScanSuccessScreen } from '../../features/qrcode/scan-success.screen';
export const Navigation = () => {
	const { isAuthenticated } = useContext(AuthenticationContext);

	return (
		<NavigationContainer>
			{isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
		</NavigationContainer>
	);
};
