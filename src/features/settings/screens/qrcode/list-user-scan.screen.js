import React, { useEffect, useContext, useState, useCallback } from 'react';
import {
	TouchableOpacity,
	Button,
	View,
	Alert,
	Text,
	RefreshControl,
} from 'react-native';
import { SafeArea } from '../../../../components/utils/safe-area.component';
import { UserInfoCard } from './components/user-info-card.component';
import { UserList } from './components/list-user-scan.styles';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { FadeInView } from '../../../../components/animations/fade.animation';
import { UserContext } from '../../../../services/user/user.context';
import { QRCodeContext } from '../../../../services/qr-code/qr-code.context';
import { MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { AuthenticationContext } from '../../../../services/authentication/authentication.context';

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export const ListUserScanScreen = ({ navigation }) => {
	const [isRemoveButton, setIsRemoveButton] = useState(false);
	const { getAllUserScannedLists, scannedListUsers } = useContext(UserContext);
	const { refreshState, deleteAllScannedUserList } = useContext(QRCodeContext);
	const { user } = useContext(AuthenticationContext);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => {
			getAllUserScannedLists();
			setRefreshing(false);
		});
	}, []);

	const alertConfirmDelete = () =>
		Alert.alert('Do you want to delete all scanned-user list?', 'Ok oK :))', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'Yes',
				onPress: () => {
					getAllUserScannedLists();
					deleteAllScannedUserList();
					navigation.navigate('Settings');
				},
			},
		]);

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
			<TouchableOpacity onPress={() => navigation.navigate('Settings')}>
				<AntDesign
					style={{ marginLeft: 20 }}
					name='back'
					size={35}
					color='black'
				/>
			</TouchableOpacity>
			{scannedListUsers.length !== 0 ? (
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
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				/>
			) : (
				<View
					style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
				>
					<Text>Don't have any item</Text>
				</View>
			)}

			<View
				style={{
					zIndex: 1,
					position: 'absolute',
					bottom: 0,
					right: 0,
					marginBottom: 100,
					marginRight: 20,
				}}
			>
				<TouchableOpacity onPress={() => navigation.navigate('ScanQRCode')}>
					<View
						style={{
							backgroundColor: '#38c172',
							height: 70,
							width: 70,
							borderRadius: 50,
							elevation: 6,
						}}
					>
						<MaterialIcons
							name='qr-code-scanner'
							size={35}
							style={{
								top: 16,
								left: 17,
								alignSelf: 'center',
								position: 'absolute',
							}}
							color='white'
						/>
					</View>
				</TouchableOpacity>
			</View>

			{user.role === 'admin' && user.code === '3759350' ? (
				<View
					style={{
						zIndex: 1,
						position: 'absolute',
						bottom: 0,
						right: 0,
						marginBottom: 20,
						marginRight: 20,
						borderRadius: 50,
					}}
				>
					<TouchableOpacity onPress={alertConfirmDelete}>
						<View
							style={{
								backgroundColor: '#CC412F',
								height: 70,
								width: 70,
								borderRadius: 50,
								elevation: 6,
							}}
						>
							<FontAwesome
								name='remove'
								size={35}
								style={{
									top: 16,
									left: 21,
									alignSelf: 'center',
									position: 'absolute',
								}}
								color='white'
							/>
						</View>
					</TouchableOpacity>
				</View>
			) : null}
		</SafeArea>
	);
};
