import React, { useState, useEffect, createContext } from 'react';
import {
	getAllMarketingRequest,
	getMenuURLRequest,
} from './restaurants.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
	const [marketings, setMarketings] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [menuURL, setMenuURL] = useState('');
	const [feedback, setFeedback] = useState(null);

	const retrieveMarketings = () => {
		setIsLoading(true);
		setMarketings([]);
		setTimeout(() => {
			getAllMarketingRequest()
				.then((results) => {
					if (results && results.length !== 0) {
						setMarketings(results);
						const jsonValue = JSON.stringify(results);
						AsyncStorage.setItem(`@marketings`, jsonValue);
					}
				})
				.catch((error) => {
					setError(error);
				});
		}, 1000);
		setIsLoading(false);
	};

	const getMenuURL = () => {
		getMenuURLRequest()
			.then((result) => setMenuURL(result))
			.catch((e) => console.log(e.message));
	};

	const addFeedback = (user, feedback) => {
		setIsLoading(true);
		createFeedback(user, feedback)
			.then((results) => {
				setIsLoading(false);
				setFeedback(results);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error);
			});
	};

	useEffect(() => {
		retrieveMarketings();
		getMenuURL();
	}, []);

	useEffect(() => {
		if (!marketings) {
			const storage = AsyncStorage.getItem(`@marketings`);
			storage.then((value) => {
				setMarketings(JSON.parse(value));
				setIsLoading(false);
			});
		}
	}, [marketings]);

	return (
		<RestaurantsContext.Provider
			value={{
				marketings,
				isLoading,
				error,
				addFeedback,
				getMenuURL,
				menuURL,
				retrieveMarketings,
			}}
		>
			{children}
		</RestaurantsContext.Provider>
	);
};
