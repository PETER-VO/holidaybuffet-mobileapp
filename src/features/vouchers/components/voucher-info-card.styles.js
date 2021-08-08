import styled from 'styled-components/native';

import { Card } from 'react-native-paper';

export const VoucherCard = styled(Card)`
	background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const VoucherCardCover = styled(Card.Cover)`
	padding: 20px;
	background-color: ${(props) => props.theme.colors.bg.primary};
`;
