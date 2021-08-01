import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';
import { getAllPhoneTokens } from './notification.service';

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [error, setError] = useState(null);
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

	return (
		<NotificationContext.Provider
			value={{
				sendNotificationAllDevices,
				isLoading,
			}}
		>
			{children}
		</NotificationContext.Provider>
	);
};

async function sendPushNotification(token, title, body) {
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
