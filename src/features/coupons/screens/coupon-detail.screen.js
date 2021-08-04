import React, { useState } from 'react';
import { Text } from '../../../components/typography/text.component';
import { Image, View } from 'react-native';
import { Button } from 'react-native-paper';

import { SafeArea } from '../../../components/utils/safe-area.component';

export const CouponDetailScreen = ({ navigation, route }) => {
	const { coupon } = route.params;
	const { id, userId, title, subTitle, expired, level } = coupon.item;
	return (
		<SafeArea
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: 0,
				paddingLeft: 10,
				paddingRight: 10,
				paddingBottom: 15,
				paddingTop: 45,
			}}
		>
			<View
				style={{
					borderRadius: 1,
					borderWidth: 4,
					borderStyle: 'dashed',

					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100%',
				}}
			>
				<Text
					style={{
						fontFamily: 'TradeWinds_400Regular',
						fontSize: 30,
					}}
				>
					Holiday Buffet
				</Text>
				<Image
					style={{
						width: 60,
						height: 60,
					}}
					source={require('../../../../assets/holidayBuffet.jpg')}
				/>
				<Text
					style={{
						color: '#CC412F',
						fontSize: 60,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					{subTitle}
				</Text>
				<Text
					style={{
						fontWeight: 'bold',
						fontSize: 18,
						marginTop: 20,
						textAlign: 'center',
					}}
				>
					Gift Voucher For {level}
				</Text>

				<Text
					style={{
						borderWidth: 2,
						width: '90%',
						textAlign: 'center',
						borderColor: '#E4E6E8',
						marginTop: 20,
					}}
				>
					Valid through {expired}
				</Text>
				<Image source={require('../../../../assets/qr-code.png')} />
				<Button
					style={{
						backgroundColor: '#CC412F',
						width: 350,
						marginTop: 20,
					}}
					color='white'
					onPress={() => navigation.goBack()}
				>
					Back
				</Button>
			</View>
		</SafeArea>
	);
};
