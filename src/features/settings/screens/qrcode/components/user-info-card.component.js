import React from 'react';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../../../../../components/typography/text.component';
import { TextTitle, TextValue, Section } from './show-user-inform.styles';

export const UserInfoCard = () => {
	return (
		<Card
			style={{
				height: 195,
				margin: 10,
				padding: 18,
				borderWidth: 3,
				borderColor: 'black',
			}}
		>
			<FontAwesome
				name='remove'
				size={24}
				color='#CC412F'
				style={{ position: 'absolute', right: 0, top: -15 }}
			/>
			<Image
				style={{
					width: 50,
					height: 50,
					position: 'absolute',
					right: 0,
					bottom: 0,
				}}
				source={require('../../../../../../assets/holidayBuffet.jpg')}
			/>
			<Text
				style={{
					fontSize: 18,
					borderBottomWidth: 3,
					borderBottomColor: '#CC412F',
				}}
			>
				Voucher (06/08/2021 - 17:43)
			</Text>
			<View
				style={{
					marginTop: 10,
				}}
			>
				<Section>
					<Text>Phone number:</Text>
					<TextValue>0417503310</TextValue>
				</Section>
				<Section>
					<Text>Last date:</Text>
					<TextValue>06/08/2021</TextValue>
				</Section>
				<Section>
					<Text>Check-in:</Text>
					<TextValue>5</TextValue>
				</Section>
				<Section>
					<Text>Feed-back:</Text>
					<TextValue>3</TextValue>
				</Section>
			</View>
		</Card>
	);
};
