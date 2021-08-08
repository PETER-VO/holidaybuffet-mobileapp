import React from 'react';
import { CheckBox, View, Text } from 'react-native';
import { Spacer } from '../spacer/spacer.component';

export const CheckBoxCustom = ({ label, value, onChange }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				margin: 15,
				marginTop: 0,
			}}
		>
			<CheckBox value={value} onValueChange={onChange} />
			<Text>{label}</Text>
		</View>
	);
};
