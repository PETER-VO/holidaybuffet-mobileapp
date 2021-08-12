import React, { useEffect, useContext, useState } from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { UserInfoCard } from './components/user-info-card.component';
import { UserList } from './components/list-user-scan.styles';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { FadeInView } from '../../../../components/animations/fade.animation';
import { UserContext } from '../../../../services/user/user.context';
import { QRCodeContext } from '../../../../services/qr-code/qr-code.context';
import { MaterialIcons } from '@expo/vector-icons';

export const ListUserScanScreen = ({ navigation }) => {
	const [isRemoveButton, setIsRemoveButton] = useState(false);
	const { getAllUserScannedLists, scannedListUsers } = useContext(UserContext);
	const { refreshState } = useContext(QRCodeContext);

	useEffect(() => {
		getAllUserScannedLists();
		refreshState();
	}, []);

	useEffect(() => {
		if (isRemoveButton) {
			getAllUserScannedLists();
		}
		setIsRemoveButton(false);
	}, [isRemoveButton]);

	return (
		<SafeArea style={{ marginTop: 0, paddingTop: 40 }}>
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
			<TouchableOpacity onPress={() => navigation.navigate('ScanQRCode')}>
				<View
					style={{
						backgroundColor: '#38c172',
					}}
				>
					<MaterialIcons
						name='qr-code-scanner'
						size={35}
						style={{ alignSelf: 'center' }}
						color='white'
					/>
				</View>
			</TouchableOpacity>
		</SafeArea>
	);
};
