import React, { useEffect, useState, useContext } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from '../../../../../components/typography/text.component';
import { TextTitle, TextValue, Section } from './show-user-inform.styles';
import { formattedDateAndTime } from '../../../../../components/utils/useful-method';
import { UserContext } from '../../../../../services/user/user.context';

export const UserInfoCard = ({ userCard }) => {
	const [lastDateCheckIn, setLastDateCheckIn] = useState('');
	const { phoneNumber, noCheckIn, listDateCheckIn } = userCard.item.userInfo;
	const { deleteScannedListUserById } = useContext(UserContext);
	const { createdAt } = userCard.item;
	// const feedbacks = userCard.item.feedback;

	useEffect(() => {
		if (listDateCheckIn.length !== 0) {
			let lastDate;
			if (listDateCheckIn.length > 0) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 2];
			} else {
				lastDate = listDateCheckIn[0];
			}
			console.log('lastDate: ', lastDate);
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
				height: 195,
				margin: 10,
				padding: 18,
				borderWidth: 3,
				borderColor: 'black',
			}}
		>
			<TouchableOpacity onPress={alertConfirmRemove}>
				<FontAwesome
					name='remove'
					size={24}
					color='#CC412F'
					style={{ position: 'absolute', right: 0, top: -15 }}
				/>
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
				Voucher ({formattedDateAndTime(createdAt.seconds)})
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
					<TextValue>{lastDateCheckIn}</TextValue>
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
