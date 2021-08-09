import React from 'react';
import { Text } from 'react-native';

export const TextTradesWindFont = ({ title, ...otherProps }) => (
	<Text style={{ fontFamily: 'TradeWinds_400Regular', marginBottom: 20 }}>
		{title}
	</Text>
);
