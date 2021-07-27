import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { LoginByPhoneScreen } from '../../features/account/screens/loginbyphone/loginByPhone.screen';
import { RegisterScreen } from '../../features/account/screens/register.screen';
import { InputOTPScreen } from '../../features/account/screens/loginbyphone/inputOTP.screen';
import { RestaurantFeedback } from '../../features/restaurants/components/restaurant-feedback.component';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
	<Stack.Navigator headerMode='none'>
		{/* <Stack.Screen name='Main' component={RestaurantFeedback} /> */}
		<Stack.Screen name='Main' component={AccountScreen} />
		<Stack.Screen name='LoginByPhone' component={LoginByPhoneScreen} />
		<Stack.Screen name='InputOTP' component={InputOTPScreen} />
		<Stack.Screen name='Register' component={RegisterScreen} />
	</Stack.Navigator>
);
