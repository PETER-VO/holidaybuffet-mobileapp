import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthenticationContext } from '../../services/authentication/authentication.context';
import { AppNavigator } from './app.navigator';
import { AccountNavigator } from './account.navigator';
import LottieView from 'lottie-react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { SafeArea } from '../../components/utils/safe-area.component';
import { Text } from 'react-native';

export const Navigation = () => {
	const { isAuthenticated } = useContext(AuthenticationContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	return (
		<NavigationContainer>
			{/* {isAuthenticated ? <AppNavigator /> : <AccountNavigator />} */}
			{/* {isLoading ? (
				
			) : null} */}
			{isLoading ? (
				<SafeArea style={{ justifyContent: 'center' }}>
					<ActivityIndicator
						animating={true}
						size={50}
						color={Colors.blue300}
					/>
				</SafeArea>
			) : isAuthenticated ? (
				<AppNavigator />
			) : (
				<AccountNavigator />
			)}
		</NavigationContainer>
	);
};
