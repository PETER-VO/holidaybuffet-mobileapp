import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { LocationContextProvider } from '../../services/location/location.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { SettingNavigator } from './settings.navigator';
import { RestaurantsNavigator } from './restaurants.navigator';
import { QRCodeNavigator } from './qrcode.navigator';
import { NotificationContextProvider } from '../../services/notification/notification.context';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	QRCode: 'md-qr-code-outline',
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
				<NotificationContextProvider>
					<Tab.Navigator
						screenOptions={createScreenOptions}
						tabBarOptions={{
							activeTintColor: 'tomato',
							inactiveTintColor: 'gray',
						}}
					>
						<Tab.Screen name='Settings' component={SettingNavigator} />
						<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
						<Tab.Screen name='QRCode' component={QRCodeNavigator} />
					</Tab.Navigator>
				</NotificationContextProvider>
			</RestaurantsContextProvider>
		</LocationContextProvider>
	</FavouritesContextProvider>
);
