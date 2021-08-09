import React, { useState, useEffect, createContext, useContext } from 'react';
import {
	getAllUsersRequest,
	getUserByUserIdRequest,
	getAllFeedBackByUserIdRequest,
} from './user.service';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const getAllUsers = () => {
		setIsLoading(true);
		getAllUsersRequest()
			.then((results) => {
				setUsers(results);
				setIsLoading(false);
			})
			.catch((e) => console.log('Get All Users error: ', e.message));
	};

	const getUserByUserId = (userId) => {
		return getUserByUserIdRequest(userId);
	};

	const getAllFeedBackByUserId = (userId) => {
		return getAllFeedBackByUserIdRequest(userId);
	};

	const checkInForUser = () => {
		console.log('1');
	};

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<UserContext.Provider
			value={{
				users,
				checkInForUser,
				getUserByUserId,
				getAllFeedBackByUserId,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
