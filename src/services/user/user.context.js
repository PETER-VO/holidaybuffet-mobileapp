import React, { useState, useEffect, createContext, useContext } from 'react';
import {
	getAllUsersRequest,
	getUserByUserIdRequest,
	getAllFeedBackByUserIdRequest,
	addAllUserInformation,
	updateListCheckInByUserIdRequest,
	getAllScannedListRequest,
	deleteScannedListUserByIdRequest,
} from './user.service';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [scannedListUsers, setScannedListUsers] = useState([]);
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

	const deleteScannedListUserById = (id) => {
		deleteScannedListUserByIdRequest(id);
	};

	const getAllFeedBackByUserId = (userId) => {
		return getAllFeedBackByUserIdRequest(userId);
	};

	const addAllUserInformationAfterScanQRCode = (information) => {
		addAllUserInformation(information);
	};

	const updateListCheckInByUser = (user) => {
		const { id, listDateCheckIn } = user;
		updateListCheckInByUserIdRequest(id, listDateCheckIn);
	};

	const getAllUserScannedLists = () => {
		getAllScannedListRequest()
			.then((results) => {
				setScannedListUsers(results);
			})
			.catch((e) => {
				console.log('Error Get All ScannedList', e.message);
			});
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
				addAllUserInformationAfterScanQRCode,
				getAllUsers,
				updateListCheckInByUser,
				getAllUserScannedLists,
				deleteScannedListUserById,
				scannedListUsers,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
