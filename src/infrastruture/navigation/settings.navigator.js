import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { SettingScreen } from '../../features/settings/screens/settings.screen';
import { NotificationScreen } from '../../features/notification/notification.screen';
import { NotificationContextProvider } from '../../services/notification/notification.context';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { FavouritesScreen } from '../../features/settings/screens/favourites/favourties.screen';
import { ManagementControl } from '../../features/settings/screens/general-managements/screens/management-control.screen';
import { SendVoucherScreen } from '../../features/settings/screens/general-managements/send-vouchers/screens/send-voucher.screen';
import { ScanQRCode } from '../../features/settings/screens/qrcode/scan-qrcode.screen';

const SettingsStack = createStackNavigator();

export const SettingNavigator = () => {
	return (
		<NotificationContextProvider>
			<SettingsStack.Navigator
				headerMode='screen'
				screenOptions={{
					CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				}}
			>
				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='Settings'
					component={SettingScreen}
				/>
				<SettingsStack.Screen name='Favourites' component={FavouritesScreen} />
				<SettingsStack.Screen
					name='SendVouchers'
					component={SendVoucherScreen}
				/>
				<SettingsStack.Screen
					name='Notification'
					component={NotificationScreen}
				/>
				<SettingsStack.Screen
					name='ManagementControl'
					component={ManagementControl}
				/>

				{/* Start QR CODE */}
				<SettingsStack.Screen name='ScanQRCode' component={ScanQRCode} />
				{/* <SettingsStack.Screen
					name='ScanSuccess'
					component={ScanSuccessScreen}
				/> */}
				{/* End QR CODE */}
				<SettingsStack.Screen name='Logout' component={AccountScreen} />
			</SettingsStack.Navigator>
		</NotificationContextProvider>
	);
};
