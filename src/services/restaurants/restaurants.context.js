import React, { useState, useEffect, createContext, useContext } from 'react';
import {
	restaurantsRequest,
	restaurantsTransform,
	createFeedback,
} from './restaurants.service';

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = ({ children }) => {
	const [restaurants, setRestaurants] = useState([]);
	const [isLoading, setIsLoading] = useState([]);
	const [error, setError] = useState(null);
	const [feedback, setFeedback] = useState(null);

	const retrieveRestaurants = (loc) => {
		setIsLoading(true);
		setRestaurants([]);

		setTimeout(() => {
			restaurantsRequest(loc)
				.then(restaurantsTransform)
				.then((results) => {
					setIsLoading(false);
					setRestaurants(results);
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
		retrieveRestaurants('Chicago');
	}, []);

	return (
		<RestaurantsContext.Provider
			value={{ restaurants, isLoading, error, addFeedback }}
		>
			{children}
		</RestaurantsContext.Provider>
	);
};
