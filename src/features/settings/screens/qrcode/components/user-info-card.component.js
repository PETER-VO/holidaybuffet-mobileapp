import React, { useEffect, useState, useContext } from 'react';
import { View, Image, Alert, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../../../../../components/typography/text.component';
import { TextTitle, TextValue, Section } from './show-user-inform.styles';
import { formattedDateAndTime } from '../../../../../components/utils/useful-method';
import { UserContext } from '../../../../../services/user/user.context';

export const UserInfoCard = ({ userCard }) => {
	const [lastDateCheckIn, setLastDateCheckIn] = useState('');
	const { phoneNumber, noCheckIn, listDateCheckIn } = userCard.item.userInfo;
	console.log('---------------');
	console.log('listDateCheckIn: ', listDateCheckIn);
	const { deleteScannedListUserById } = useContext(UserContext);
	const { createdAt, title, status, errors } = userCard.item;
	const feedbacks = Object.values(userCard.item.feedbacks);

	useEffect(() => {
		if (listDateCheckIn && listDateCheckIn.length !== 0) {
			console.log('Ok');
			let lastDate;
			if (listDateCheckIn.length > 2) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 1];
			} else if (listDateCheckIn.length > 1) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 1];
			} else {
				lastDate = listDateCheckIn[0];
			}
			let formattedLastDate = formattedDateAndTime(lastDate.seconds);

			setLastDateCheckIn(formattedLastDate);
		}
	}, [listDateCheckIn]);

	const alertConfirmRemove = () =>
		Alert.alert('Do you want to remove?', "Don't do that! :(", [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: () => {
					deleteScannedListUserById(id);
					onPressRemove();
				},
			},
		]);

	return (
		<Card
			style={{
				height: 210,
				margin: 10,
				padding: 16,
				borderWidth: 3,
				borderColor: 'black',
			}}
		>
			<TouchableOpacity
				style={{ position: 'absolute', right: 0, top: 0 }}
				onPress={() => console.log('Press me')}
			>
				<FontAwesome name='remove' size={24} color='#CC412F' />
			</TouchableOpacity>

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
				<View>
					<Text style={{ color: status ? '#38c172' : '#CC412F' }}>{title}</Text>
					<Text style={{ fontSize: 12 }}>
						({formattedDateAndTime(createdAt.seconds)})
					</Text>
				</View>
			</Text>
			{status ? (
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
						<TextValue>{lastDateCheckIn}</TextValue>
					</Section>
					<Section>
						<Text>Check-in:</Text>
						<TextValue>{noCheckIn}</TextValue>
					</Section>
					<Section>
						<Text>Feedback:</Text>
						<TextValue>
							{feedbacks.length !== 0 ? feedbacks.length : 0}
						</TextValue>
					</Section>
				</View>
			) : (
				<View
					style={{
						marginTop: 10,
					}}
				>
					<Section>
						<Text style={{ color: '#CC412F' }}>Error:</Text>
						<TextValue>{errors}</TextValue>
					</Section>
					<Section>
						<Text>Phone number:</Text>
						<TextValue>{phoneNumber}</TextValue>
					</Section>
					<Section>
						<Text>Last date:</Text>
						<TextValue>{lastDateCheckIn}</TextValue>
					</Section>
					<Section>
						<Text>Check-in:</Text>
						<TextValue>{noCheckIn}</TextValue>
					</Section>
				</View>
			)}
		</Card>
	);
};
