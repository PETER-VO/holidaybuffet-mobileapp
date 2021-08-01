import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Button, Platform } from 'react-native';
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
	const notificationListener = useRef();
	const responseListener = useRef();
	const { sendNotificationAllDevices, isLoading } =
		useContext(NotificationContext);

	const onSubmit = async () => {
		sendNotificationAllDevices(title, subTitle);
	};

	return (
		<SafeArea style={{ margin: 20 }}>
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
		</SafeArea>
	);
};

async function sendPushNotification(token, title, body) {
	const message = {
		to: token,
		sound: 'default',
		title: title,
		body: body,
		data: { someData: 'goes here' },
	};

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}
