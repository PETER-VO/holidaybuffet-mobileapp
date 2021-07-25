import React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AccountScreen } from '../../features/account/screens/account.screen';
import { LoginScreen } from '../../features/account/screens/login.screen';
import { RegisterScreen } from '../../features/account/screens/register.screen';
import { testLogin } from '../../features/account/screens/testLogin';
import { InputOTPScreen } from '../../features/account/screens/inputOTP.screen';

const Stack = createStackNavigator();

export const AccountNavigator = () => (
	<Stack.Navigator headerMode='none'>
		<Stack.Screen name='Main' component={AccountScreen} />
		<Stack.Screen name='Login' component={InputOTPScreen} />
		<Stack.Screen name='Register' component={RegisterScreen} />
	</Stack.Navigator>
);
