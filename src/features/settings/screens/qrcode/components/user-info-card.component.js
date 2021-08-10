import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../../../../../components/typography/text.component';
import { TextTitle, TextValue, Section } from './show-user-inform.styles';

export const UserInfoCard = ({ userCard }) => {
	console.log('userProfile: ', userCard.item.userInfo);
	const [lastDateCheckIn, setLastDateCheckIn] = useState('Not yet');
	const [lastDateOfTime, setLastDateOfTime] = useState('');
	const { phoneNumber, noCheckIn, listDateCheckIn } = userCard.item.userInfo;
	// const feedbacks = userCard.item.feedback;

	useEffect(() => {
		if (listDateCheckIn.length !== 0) {
			let lastDate;
			if (listDateCheckIn.length > 0) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 2];
			} else {
				lastDate = listDateCheckIn[0];
			}
			let date = new Date(lastDate.seconds * 1000);
			let hours = date.getHours();
			let minutes = '0' + date.getMinutes();
			let seconds = '0' + date.getSeconds();
			let formattedTime =
				hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

			let formattedDate = `${date.getDate()}/${
				date.getMonth() + 1
			}/${date.getFullYear()}`;
			setLastDateOfTime(formattedTime);
			setLastDateCheckIn(formattedDate);
		}
	}, [listDateCheckIn]);

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
					<TextValue>{phoneNumber}</TextValue>
				</Section>
				<Section>
					<Text>Last date:</Text>
					<TextValue>{lastDateCheckIn} --</TextValue>
					<TextValue>{lastDateOfTime}</TextValue>
				</Section>
				<Section>
					<Text>Check-in:</Text>
					<TextValue>{noCheckIn}</TextValue>
				</Section>
				<Section>
					<Text>Feedback:</Text>
					{/* <TextValue>{feedbacks ? feedbacks.length : 0}</TextValue> */}
				</Section>
			</View>
		</Card>
	);
};
