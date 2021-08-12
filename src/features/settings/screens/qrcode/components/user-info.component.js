import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import {
	Section,
	TextValue,
	TextTitle,
	TitleCustomTradesForm,
} from './show-user-inform.styles';
import {
	formattedDate,
	formattedDateAndTime,
} from '../../../../../components/utils/useful-method';

export const UserInfo = ({ userInfo, feedbacks, existedVouchers }) => {
	const { id, phoneNumber, noCheckIn, listDateCheckIn, customerType } =
		userInfo;

	const [listExpanded, setListExpanded] = useState(false);
	const [lastDateCheckIn, setLastDateCheckIn] = useState();

	useEffect(() => {
		if (listDateCheckIn.length !== 0) {
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

	return (
		<>
			<TitleCustomTradesForm>User Profile</TitleCustomTradesForm>
			<View style={{ marginLeft: 18, marginBottom: 20 }}>
				<Section>
					<TextTitle>* Id_User :</TextTitle>
					<TextValue>{id}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Phone number :</TextTitle>
					<TextValue>{phoneNumber}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Customer type :</TextTitle>
					<TextValue>{customerType}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Last date check-in :</TextTitle>
					<TextValue>{`${lastDateCheckIn}`}</TextValue>
				</Section>
				<Section>
					<TextTitle>* No check-in :</TextTitle>
					<TextValue>{noCheckIn}</TextValue>
				</Section>
				<Section>
					<TextTitle>* No feedback :</TextTitle>
					<TextValue>{feedbacks.length}</TextValue>
				</Section>
				<Section>
					<TextTitle>* No Voucher:</TextTitle>
					<TextValue>{existedVouchers.length}</TextValue>
				</Section>
				<List.Accordion
					style={{ backgroundColor: 'white', padding: 0 }}
					title='* Date check in'
					// left={(props) => (
					// 	<List.Icon
					// 		{...props}
					// 		color='black'
					// 		style={{ marginLeft: 0 }}
					// 		icon='piggy-bank'
					// 	/>
					// )}
					theme={{ colors: { primary: '#CC412F' } }}
					expanded={listExpanded}
					onPress={() => setListExpanded(!listExpanded)}
				>
					{listDateCheckIn.map((e, i) => (
						<Section>
							<TextTitle style={{ color: '#CC412F', fontSize: 16 }}>
								{i + 1}.
							</TextTitle>
							<TextValue>{formattedDateAndTime(e.seconds)}</TextValue>
						</Section>
					))}
				</List.Accordion>
			</View>
		</>
	);
};
