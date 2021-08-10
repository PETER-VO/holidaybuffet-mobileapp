import React, { useEffect, useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { UserInfoCard } from './components/user-info-card.component';
import { UserList } from './components/list-user-scan.styles';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { FadeInView } from '../../../../components/animations/fade.animation';
import { UserContext } from '../../../../services/user/user.context';

export const ListUserScanScreen = ({ navigation }) => {
	const [isRemoveButton, setIsRemoveButton] = useState(false);
	const { getAllUserScannedLists, scannedListUsers } = useContext(UserContext);

	useEffect(() => {
		getAllUserScannedLists();
	}, []);

	useEffect(() => {
		if (isRemoveButton) {
			getAllUserScannedLists();
		}
		setIsRemoveButton(false);
	}, [isRemoveButton]);

	return (
		<SafeArea style={{ marginTop: 0 }}>
			<UserList
				data={scannedListUsers}
				renderItem={(item) => {
					return (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('ShowUserInform', { userInform: item })
							}
						>
							<Spacer position='bottom' size='large'>
								<FadeInView>
									<UserInfoCard
										key={item.id}
										userCard={item}
										onPressRemove={() => setIsRemoveButton(!isRemoveButton)}
									/>
								</FadeInView>
							</Spacer>
						</TouchableOpacity>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeArea>
	);
};
