import React from 'react';
import { Text } from 'react-native';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { RestaurantsScreen } from '../../features/restaurants/screens/restaurants.screen';
import { RestaurantFeedback } from '../../features/restaurants/screens/restaurant-feedback.screen';

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
	return (
		<RestaurantStack.Navigator
			headerMode='none'
			screenOptions={{
				...TransitionPresets.ModalPresentationIOS,
			}}
		>
			<RestaurantStack.Screen
				name='Restaurants'
				component={RestaurantsScreen}
			/>
			<RestaurantStack.Screen name='Feedback' component={RestaurantFeedback} />
		</RestaurantStack.Navigator>
	);
};
