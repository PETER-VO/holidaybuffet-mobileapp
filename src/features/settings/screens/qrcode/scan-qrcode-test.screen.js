import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';

export const ScanQRCodeTest = ({ navigation, route }) => {
	let animation = null;

	useEffect(() => {
		animation.play();
	}, []);

	return (
		<SafeArea>
			<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
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
					source={require('../../../../../assets/8707-loading.json')}
				/>
			</View>
		</SafeArea>
	);
};
