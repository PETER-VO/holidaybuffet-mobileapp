import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthenticationContext } from '../authentication/authentication.context';

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
	const [favourites, setFavourites] = useState([]);
	const { user } = useContext(AuthenticationContext);

	const saveFavourites = async (value, uid) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue);
		} catch (e) {
			console.log('error storing ', e);
		}
	};

	const loadFavourites = async (uid) => {
		try {
			const value = await AsyncStorage.getItem(`@favourites-${uid}`);
			if (value != null) {
				setFavourites(JSON.parse(value));
			}
		} catch (e) {
			console.log('error loading ', e.message);
		}
	};

	useEffect(() => {
		function callback(params) {
			if (user) {
				loadFavourites(user.uid);
			}
		}
		callback();
	}, [user]);

	useEffect(() => {
		if (user) {
			saveFavourites(favourites, user.uid);
		}
	}, [favourites, user]);

	const add = (restaurant) => {
		setFavourites([...favourites, restaurant]);
	};

	const remove = (restaurant) => {
		const newFavourites = favourites.filter(
			(x) => x.placeId !== restaurant.placeId
		);

		setFavourites(newFavourites);
	};
	return (
		<FavouritesContext.Provider
			value={{
				favourites,
				addToFavourites: add,
				removeFromFavourites: remove,
			}}
		>
			{children}
		</FavouritesContext.Provider>
	);
};
