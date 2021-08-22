import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { LoginByPhoneScreen } from '../../features/account/screens/loginbyphone/loginByPhone.screen';
import { InputOTPScreen } from '../../features/account/screens/loginbyphone/inputOTP.screen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='Main' component={AccountScreen} />
		<Stack.Screen name='LoginByPhone' component={LoginByPhoneScreen} />
		<Stack.Screen name='InputOTP' component={InputOTPScreen} />
	</Stack.Navigator>
);
