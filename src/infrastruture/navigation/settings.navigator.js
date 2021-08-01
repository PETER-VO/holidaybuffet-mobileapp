import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { SettingScreen } from '../../features/settings/screens/settings.screen';
import { FavouritesScreen } from '../../features/settings/screens/favourties.screen';
import { NotificationScreen } from '../../features/notification/notification.screen';
import { NotificationContextProvider } from '../../services/notification/notification.context';
import { AccountScreen } from '../../features/account/screens/account.screen';

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
					name='Notification'
					component={NotificationScreen}
				/>
				<SettingsStack.Screen
					options={{
						header: () => null,
					}}
					name='Logout'
					component={AccountScreen}
				/>
			</SettingsStack.Navigator>
		</NotificationContextProvider>
	);
};
