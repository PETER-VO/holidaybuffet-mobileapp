import React, { createContext, useState } from 'react';
import { getAllPhoneTokens } from './notification.service';

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	const sendNotificationAllDevices = (title, body) => {
		if (!title) {
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			getAllPhoneTokens()
				.then((tokens) => {
					tokens.map(async (token) => {
						await sendPushNotification(token, title, body);
					});
					setIsLoading(false);
				})
				.catch((e) => {
					setIsLoading(false);
					console.log('Error send notifications, ', e.message);
				});
		}, 3000);
	};

	const sendNotificationForUsers = (users, title, body) => {
		if (title && users) {
			users.map((user) => {
				sendNotificationForUser(user, title, body);
			});
		}
	};

	const sendNotificationForUser = (user, title, body) => {
		if (title && user) {
			let phoneTokens = user.phoneTokens;
			phoneTokens.map((phoneToken) =>
				sendPushNotification(phoneToken, title, body)
			);
		}
	};

	return (
		<NotificationContext.Provider
			value={{
				sendNotificationAllDevices,
				sendNotificationForUsers,
				sendNotificationForUser,
				isLoading,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

async function sendPushNotification(token, title, body) {
	console.log('Vao roi ne:', token);
	const message = {
		to: token,
		sound: 'default',
		title: title,
		body: body,
		data: { data: 'click now' },
		_displayInForeground: true,
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
