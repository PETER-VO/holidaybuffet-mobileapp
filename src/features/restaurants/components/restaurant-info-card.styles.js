import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { Card } from 'react-native-paper';

export const RestaurantCard = styled(Card)`
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const RestaurantCardCover = styled(Card.Cover)`
	flex: 1;
	resize-mode: contain;
	height: 235px;
	padding: 20px;
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ImageCardCoverContainer = styled(Card)`
	background-color: ${(props) => props.theme.colors.bg.primary};
	padding: 5px;
`;

export const ImageCardCover = styled(Card.Cover)`
	resize-mode: contain;
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const Address = styled(Text)`
	font-family: ${(props) => props.theme.fonts.body};
	font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled(View)`
	padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled(View)`
	flex-direction: row;
	padding-top: ${(props) => props.theme.space[2]};
	padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled(View)`
	flex-direction: row;
	align-items: center;
`;

export const SectionEnd = styled(View)`
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;
`;
