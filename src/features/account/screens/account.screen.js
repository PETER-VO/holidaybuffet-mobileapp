import React from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import LottieView from 'lottie-react-native';

import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	Title,
	AnimationWrapper,
} from '../components/account.styles';

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
					source={require('../../../../assets/watermelon.json')}
				/>
			</AnimationWrapper>
			<Title>Holiday Buffet</Title>
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
