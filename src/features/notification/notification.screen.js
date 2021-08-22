import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useRef, useContext } from 'react';
import { View, Button, Platform, ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Text } from '../../components/typography/text.component';
import { SafeArea } from '../../components/utils/safe-area.component';
import { NotificationContext } from '../../services/notification/notification.context';
import { ActivityIndicator, Colors } from 'react-native-paper';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const NotificationScreen = () => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
	const [title, setTitle] = useState('');
	const [subTitle, setSubTitle] = useState('');
	const { sendNotificationAllDevices, isLoading } =
		useContext(NotificationContext);

	const onSubmit = async () => {
		sendNotificationAllDevices(title, subTitle);
	};

	return (
		<SafeArea style={{ marginTop: 0, padding: 20 }}>
			<ScrollView>
				<Text>Your expo push token: {expoPushToken}</Text>
				<Text>Input: </Text>
				<View>
					<View style={{ flexDirection: 'row', margin: 20 }}>
						<Text variants='subject' style={{ flex: 2 }}>
							Title:{' '}
						</Text>
						<TextInput
							style={{
								flex: 8,
								height: 80,
								borderColor: 'gray',
								borderWidth: 1,
								padding: 10,
								textAlignVertical: 'top',
							}}
							onChangeText={(e) => setTitle(e)}
						/>
					</View>

					<View style={{ flexDirection: 'row', margin: 20 }}>
						<Text variants='subject' style={{ flex: 2 }}>
							SubTitle:{' '}
						</Text>
						<TextInput
							underlineColorAndroid='transparent'
							numberOfLines={12}
							multiline={true}
							style={{
								flex: 8,
								height: 180,
								borderColor: 'gray',
								borderWidth: 1,
								padding: 10,
								textAlignVertical: 'top',
								marginBottom: 50,
							}}
							onChangeText={(e) => setSubTitle(e)}
						/>
					</View>
				</View>
				{isLoading ? (
					<ActivityIndicator animating={true} color={Colors.blue300} />
				) : (
					<Button
						title='Press to Send Notification'
						onPress={async () => {
							await onSubmit();
						}}
					/>
				)}
			</ScrollView>
		</SafeArea>
	);
};
