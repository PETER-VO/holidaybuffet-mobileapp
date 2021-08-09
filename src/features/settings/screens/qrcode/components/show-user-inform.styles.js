import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const TitleCustomTradesForm = styled(Text)`
	font-family: TradeWinds_400Regular;
	margin-bottom: 20px;
	font-size: 18px;
	border-bottom-width: 3px;
	border-bottom-color: #cc412f;
`;

export const Section = styled(View)`
	flex-direction: row;
	align-items: flex-end;
`;

export const TextTitle = styled(Text)`
	color: black;
	font-weight: bold;
	font-size: 14px;
`;

export const TextValue = styled(Text)`
	margin-left: 7px;
	font-size: 16px;
	margin-bottom: 0px;
`;

export const Number = styled(Text)`
	color: #cc412f;
	font-weight: bold;
	font-size: 16px;
`;
