import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { FavouritesContextProvider } from '../../services/favourites/favourites.context';
import { RestaurantsContextProvider } from '../../services/restaurants/restaurants.context';
import { NotificationContextProvider } from '../../services/notification/notification.context';
import { SettingNavigator } from './settings.navigator';
import { UserContextProvider } from '../../services/user/user.context';
import { VoucherContextProvider } from '../../services/voucher/voucher.context';
import { VoucherNavigator } from './vouchers.navigator';
import { RestaurantsNavigator } from './restaurants.navigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
	Restaurants: 'md-restaurant',
	Vouchers: 'md-gift',
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
		<RestaurantsContextProvider>
			<NotificationContextProvider>
				<UserContextProvider>
					<VoucherContextProvider>
						<Tab.Navigator
							screenOptions={createScreenOptions}
							tabBarOptions={{
								activeTintColor: 'tomato',
								inactiveTintColor: 'gray',
							}}
						>
							<Tab.Screen
								name='Vouchers'
								component={VoucherNavigator}
								options={{ unmountOnBlur: true }}
								listeners={({ navigation }) => ({
									blur: () => navigation.setParams({ screen: undefined }),
								})}
							/>
							<Tab.Screen name='Settings' component={SettingNavigator} />

							<Tab.Screen name='Restaurants' component={RestaurantsNavigator} />
						</Tab.Navigator>
					</VoucherContextProvider>
				</UserContextProvider>
			</NotificationContextProvider>
		</RestaurantsContextProvider>
	</FavouritesContextProvider>
);
