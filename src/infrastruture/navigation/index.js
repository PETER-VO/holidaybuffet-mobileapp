import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import { Text } from 'react-native';
import { QRCodeScreen } from '../../features/qrcode/qrcode.screen';
import ScanScreen from '../../features/qrcode/scan-qrcide.screen';
export const Navigation = () => {
	const { isAuthenticated } = useContext(AuthenticationContext);

	return (
		<NavigationContainer>
			<ScanScreen />
			{/* {isAuthenticated ? <AppNavigator /> : <AccountNavigator />} */}
		</NavigationContainer>
	);
};
