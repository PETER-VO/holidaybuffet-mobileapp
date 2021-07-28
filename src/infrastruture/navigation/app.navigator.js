import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { RestaurantsNavigator } from './restaurants.navigator';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { SettingNavigator } from './settings.navigator';
import { QRCodeScreen } from '../../features/qrcode/qrcode.screen';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Map: 'md-map',
	Settings: 'md-settings',
};

const createScreenOptions = ({ route }) => {
	const iconName = TAB_ICON[route.name];
	return {
		tabBarIcon: ({ size, color }) => (
			<Ionicons name={iconName} size={size} color={color} />
		),
	};
};

export const AppNavigator = () => (
	<FavouritesContextProvider>
		<LocationContextProvider>
			<RestaurantsContextProvider>
				<Tab.Navigator
					screenOptions={createScreenOptions}
					tabBarOptions={{
						activeTintColor: 'tomato',
						inactiveTintColor: 'gray',
					}}
				>
					<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
					<Tab.Screen name='QR Code' component={QRCodeScreen} />
					<Tab.Screen name='Settings' component={SettingNavigator} />
				</Tab.Navigator>
			</RestaurantsContextProvider>
		</LocationContextProvider>
	</FavouritesContextProvider>
);
