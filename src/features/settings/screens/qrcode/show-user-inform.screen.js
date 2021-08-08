import React from 'react';
import { Text, View } from 'react-native';
import { SafeArea } from '../../components/utils/safe-area.component';

export const ShowUserInformScreen = ({ route }) => {
	let data = route.params.route.params.data;
	return (
		<SafeArea>
			<View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
				<Text>User information screen: </Text>
				<Text>{data}</Text>
			</View>
		</SafeArea>
	);
};
