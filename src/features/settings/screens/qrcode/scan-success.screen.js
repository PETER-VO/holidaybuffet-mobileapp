import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const ScanSuccessScreen = ({ navigation, route }) => {
	let animation = null;
	let scanCategory_id = route.params.scanCategory_id;
	useEffect(() => {
		animation.play();
	}, []);

	return (
		<SafeArea>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					backgroundColor: scanCategory_id === 1 ? '#000000' : '#ffffff',
				}}
			>
				<LottieView
					ref={(input) => {
						animation = input;
					}}
					key='animation'
					resizeMode='cover'
					duration={1500}
					style={{
						width: 300,
						height: 300,
					}}
					loop={false}
					onAnimationFinish={() => {
						navigation.navigate('ListUserScan');
					}}
					source={require('../../../../../assets/success-tick.json')}
				/>
			</View>
		</SafeArea>
	);
};
