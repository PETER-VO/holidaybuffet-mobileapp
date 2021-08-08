import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from '../user/user.context';

export const VoucherContext = createContext();

export const VoucherContextProvider = ({ children }) => {
	const [isLoadingQuantity, setIsLoadingQuantity] = useState(false);
	const [filteredCheckIns, setFilteredCheckIns] = useState([]);
	const [quantity, setQuantity] = useState(0);
	const { users } = useContext(UserContext);

	useEffect(() => {
		setQuantity(filteredCheckIns.length);
	}, [filteredCheckIns]);

	const filterUsersByCheckInNumber = (num_1, num_2) => {
		setIsLoadingQuantity(true);
		setTimeout(() => {
			if (users.length !== 0) {
				if (!num_1 && !num_2) {
					setFilteredCheckIns(users);
					return;
				}
				let filteredUsers = users.filter((user) => {
					let check_1 = false;
					let check_2 = false;
					let check = false;
					if (num_1) {
						check_1 = user['check-in-no'] >= num_1;
					}
					if (num_2) {
						check_2 = user['check-in-no'] <= num_2;
					} else {
						check_2 = true;
					}
					if (check_1 && check_2) {
						check = true;
					}
					return check;
				});
				setFilteredCheckIns(filteredUsers);
			}
			setIsLoadingQuantity(false);
		}, 2400);
	};

	return (
		<VoucherContext.Provider
			value={{
				filterUsersByCheckInNumber,
				quantity,
				isLoadingQuantity,
			}}
		>
			{children}
		</VoucherContext.Provider>
	);
};
