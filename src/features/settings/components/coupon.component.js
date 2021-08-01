import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Button } from 'react-native-paper';
import { Foundation } from '@expo/vector-icons';

export const CouponComponent = () => (
	<View
		style={{
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			marginTop: 15,
			marginBottom: 10,
		}}
	>
		<Foundation
			name='ticket'
			size={20}
			color='black'
			style={{ marginLeft: 20 }}
		/>
		<View style={{ flexDirection: 'column' }}>
			<ListItem.Title>1 Buffet ticket</ListItem.Title>
			<ListItem.Subtitle>Expired: 10/08/2021</ListItem.Subtitle>
		</View>
		<Button
			mode='contained'
			style={{
				width: 135,
				height: 38,
				backgroundColor: 'tomato',
			}}
			onPress={() => console.log('Hello')}
		>
			Take it!
		</Button>
	</View>
);
