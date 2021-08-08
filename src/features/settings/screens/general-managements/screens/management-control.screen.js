import React from 'react';
import { SafeArea } from '../../../../../components/utils/safe-area.component';
import { List } from 'react-native-paper';

export const ManagementControl = ({ navigation }) => (
	<SafeArea style={{ marginTop: 30 }}>
		<List.Section>
			<List.Item
				style={{ padding: 16 }}
				title='Send Vouchers'
				description='Effective Marketing'
				left={(props) => <List.Icon {...props} color='black' icon='heart' />}
				onPress={() => navigation.navigate('SendVouchers')}
			/>
			<List.Item
				style={{ padding: 16 }}
				title='Notification'
				description='View your favourites'
				left={(props) => <List.Icon {...props} color='black' icon='heart' />}
				onPress={() => navigation.navigate('Favourites')}
			/>
			<List.Item
				style={{ padding: 16 }}
				title='Tracking'
				description='View your favourites'
				left={(props) => <List.Icon {...props} color='black' icon='heart' />}
				onPress={() => navigation.navigate('Favourites')}
			/>
		</List.Section>
	</SafeArea>
);
