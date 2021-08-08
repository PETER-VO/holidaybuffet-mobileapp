import React, { useState, useEffect, createContext, useContext } from 'react';
import { getAllUsersRequest } from './user.service';

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

	useEffect(() => {
		getAllUsers();
	}, []);

	return (
		<UserContext.Provider
			value={{
				users,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
