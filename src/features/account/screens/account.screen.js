import React from 'react';
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

export const AccountScreen = ({ navigation }) => {
	return (
		<AccountBackground>
			<AccountCover />
			<AnimationWrapper>
				<LottieView
					key='animation'
					autoPlay
					loop
					resizeMode='cover'
					source={require('../../../../assets/cute-sushi.json')}
				/>
			</AnimationWrapper>
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
					onPress={() => navigation.navigate('LoginByPhone')}
				>
					Login
				</AuthButton>
			</AccountContainer>
		</AccountBackground>
	);
};
