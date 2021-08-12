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
import { ScanQRCodeLoading } from '../../features/settings/screens/qrcode/scan-qrcode-loading.screen';
import { ScanSuccessScreen } from '../../features/settings/screens/qrcode/scan-success.screen';
import { ListUserScanScreen } from '../../features/settings/screens/qrcode/list-user-scan.screen';
import { ShowUserInformScreen } from '../../features/settings/screens/qrcode/show-user-inform.screen';
import { ScanFailedScreen } from '../../features/settings/screens/qrcode/scan-failed.screen';
import { QRCodeContextProvider } from '../../services/qr-code/qr-code.context';

const SettingsStack = createStackNavigator();

export const SettingNavigator = () => {
	return (
		<QRCodeContextProvider>
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
				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='ScanSuccess'
					component={ScanSuccessScreen}
				/>

				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='ScanFailed'
					component={ScanFailedScreen}
				/>
				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='ScanQRCodeLoading'
					component={ScanQRCodeLoading}
				/>
				{/* End QR CODE */}

				{/* Start List User Scan */}
				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='ListUserScan'
					component={ListUserScanScreen}
				/>
				<SettingsStack.Screen
					name='ShowUserInform'
					component={ShowUserInformScreen}
				/>
				{/* End List User Scan */}
				<SettingsStack.Screen name='Logout' component={AccountScreen} />
			</SettingsStack.Navigator>
		</QRCodeContextProvider>
	);
};
