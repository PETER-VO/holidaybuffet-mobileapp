import React from 'react';
import { View } from 'react-native';
import {
	Section,
	TextValue,
	TextTitle,
	TitleCustomTradesForm,
	Number,
} from './show-user-inform.styles';
import {
	formattedDate,
	formattedDateAndTime,
} from '../../../../../components/utils/useful-method';

export const FeedbackInfo = ({ feedback, serial }) => {
	const { content, createdAt, rating, nameFood } = feedback;

	return (
		<View>
			<Number>{serial + 1}</Number>
			<View style={{ marginLeft: 18, marginBottom: 20 }}>
				<Section>
					<TextTitle>* Name food:</TextTitle>
					<TextValue>{nameFood}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Rating:</TextTitle>
					<TextValue>{rating}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Content:</TextTitle>
					<TextValue>{content}</TextValue>
				</Section>
				<Section>
					<TextTitle>* Created date:</TextTitle>
					<TextValue>{formattedDateAndTime(createdAt.seconds)}</TextValue>
				</Section>
			</View>
		</View>
	);
};
