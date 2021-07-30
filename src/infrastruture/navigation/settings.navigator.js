import React from 'react';
import {
	createStackNavigator,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { SettingScreen } from '../../features/settings/screens/settings.screen';
import { FavouritesScreen } from '../../features/settings/screens/favourties.screen';

const SettingsStack = createStackNavigator();

export const SettingNavigator = () => {
	return (
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
		</SettingsStack.Navigator>
	);
};
