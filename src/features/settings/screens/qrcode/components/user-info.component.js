import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
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
	const [lastDateCheckIn, setLastDateCheckIn] = useState();

	useEffect(() => {
		if (listDateCheckIn.length !== 0) {
			let lastDate;
			if (listDateCheckIn.length > 0) {
				lastDate = listDateCheckIn[listDateCheckIn.length - 2];
			} else {
				lastDate = listDateCheckIn[0];
			}
			const lastDateStr = formattedDateAndTime(lastDate.seconds);
			setLastDateCheckIn(lastDateStr);
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
				<Section>
					<TextTitle>* List of date check-in:</TextTitle>
					<TextValue>--</TextValue>
				</Section>
				<Section>
					<TextTitle>1. </TextTitle>
					<TextValue>03/08/2021</TextValue>
				</Section>
			</View>
		</>
	);
};
