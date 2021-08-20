import React, { useContext, useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';

import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	Title,
	AnimationWrapper,
} from '../components/account.styles';
import { Image } from 'react-native';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const AccountScreen = ({ navigation }) => {
	return (
		<AccountBackground>
			<AccountCover />
			<Image
				style={{
					height: 100,
					width: 100,
					opacity: 0.4,
					position: 'absolute',
					top: 60,
					left: 20,
				}}
				source={require('../../../../assets/icon-1x.png')}
			/>
			<AccountContainer>
				<AuthButton
					icon='phone-lock-outline'
					mode='contained'
					onPress={() => {
						navigation.navigate('LoginByPhone');
					}}
				>
					Login
				</AuthButton>
			</AccountContainer>
		</AccountBackground>
	);
};
