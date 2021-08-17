import React from 'react';
import { TextInput } from 'react-native-paper';

export const InputCustom = ({ title, value, onChange, ...otherProps }) => (
	<TextInput
		label={title}
		value={value}
		onChangeText={onChange}
		theme={{ colors: { primary: '#CC412F', underlineColor: 'transparent' } }}
		style={{ marginBottom: 16 }}
		mode='outlined'
		{...otherProps}
	/>
);
