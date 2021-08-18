import React, { useState, useEffect, createContext } from 'react';
import { getAllMarketingRequest } from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
	const [marketings, setMarketings] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState(null);

	const retrieveMarketings = () => {
		setIsLoading(true);
		setMarketings([]);
		setTimeout(() => {
			getAllMarketingRequest()
				.then((results) => {
					setIsLoading(false);
					setMarketings(results);
				})
				.catch((error) => {
					setIsLoading(false);
					setError(error);
				});
		}, 1000);
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
	}, []);

	return (
		<RestaurantsContext.Provider
			value={{ marketings, isLoading, error, addFeedback }}
		>
			{children}
		</RestaurantsContext.Provider>
	);
};
