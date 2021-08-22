import React from 'react';
import { View } from 'react-native';
import {
	Section,
	TextValue,
	TextTitle,
	Number,
} from './show-user-inform.styles';
import {
	formattedDate,
	formattedDateAndTime,
} from '../../../../../components/utils/useful-method';

export const ExistedVoucher = ({ voucher, serial }) => {
	const { createdAt, customerType, expiredDate, id, keyword, titleVoucher } =
		voucher;

	return (
		<>
			<Number>{serial + 1}. </Number>
			<View style={{ marginLeft: 18, marginBottom: 20 }}>
				<Section>
					<TextTitle>* idVoucher:</TextTitle>
					<TextValue>{id}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Title:</TextTitle>
					<TextValue>{titleVoucher}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Expired date:</TextTitle>
					<TextValue>{formattedDate(expiredDate.seconds)}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Customer type:</TextTitle>
					<TextValue>{customerType}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Keyword:</TextTitle>
					<TextValue>{keyword}</TextValue>
				</Section>
				<Section>
					<TextTitle>* CreatedAt:</TextTitle>
					<TextValue>{formattedDateAndTime(createdAt)}</TextValue>
				</Section>
			</View>
		</>
	);
};
