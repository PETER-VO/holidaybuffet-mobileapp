import React, { useContext, useState, useCallback } from 'react';
import { List } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import styled from 'styled-components/native';
import { Alert, RefreshControl } from 'react-native';
import { ImageQRCode } from '../../../components/utils/imageQRCode.component';
import { ScrollView } from 'react-native';
import { UserContext } from '../../../services/user/user.context';

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

const wait = (timeout) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export const SettingScreen = ({ navigation }) => {
	const { onLogout, user, setUser } = useContext(AuthenticationContext);
	const { getUserByUserId } = useContext(UserContext);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);

		wait(2000).then(() => {
			getUserByUserId(user.id).then((result) => {
				setUser(result);
			});
			setRefreshing(false);
		});
	}, []);

	const alertConfirmLogout = () => {
		Alert.alert('Do you want to logout?', '', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					onLogout();
				},
			},
		]);
	};

	return (
		<SafeArea>
			<ScrollView
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<AvatarContainer style={{ padding: 30 }}>
					<ImageQRCode value={`${user.id},1`} style={{ marginBottom: 0 }} />
				</AvatarContainer>
				<List.Section>
					<SettingsItem
						style={{ padding: 16 }}
						title='Favourites'
						description='View your favourites'
						left={(props) => (
							<List.Icon {...props} color='black' icon='heart' />
						)}
						onPress={() => navigation.navigate('Favourites')}
					/>
					<SettingsItem
						style={{ padding: 16 }}
						title='Check-in'
						description={`${user.noCheckIn}`}
						left={(props) => (
							<List.Icon {...props} color='black' icon='calendar-check' />
						)}
					/>
					{user.role === 'admin' || user.role === 'manager' ? (
						<>
							<SettingsItem
								style={{ padding: 16 }}
								title='Scan QRCode For Admin'
								description='Verify voucher and check-in'
								left={(props) => (
									<List.Icon {...props} color='black' icon='qrcode-scan' />
								)}
								onPress={() => navigation.navigate('ScanQRCode')}
							/>
							<SettingsItem
								style={{ padding: 16 }}
								title='Scanned List'
								description='List scanned users'
								left={(props) => (
									<List.Icon {...props} color='black' icon='clipboard-list' />
								)}
								onPress={() => navigation.navigate('ListUserScan')}
							/>
						</>
					) : null}
					{user.role === 'admin' && user.code === '3759350' ? (
						<SettingsItem
							style={{ padding: 16 }}
							title='General Management'
							description='Inform something'
							left={(props) => (
								<List.Icon {...props} color='black' icon='bullhorn' />
							)}
							onPress={() => navigation.navigate('ManagementControl')}
						/>
					) : null}
					{user.role === 'user' ? (
						<SettingsItem
							style={{ padding: 16 }}
							title='Scan QRCode'
							description={`Scan to open HolidayBuffet's menu`}
							left={(props) => (
								<List.Icon {...props} color='black' icon='qrcode-scan' />
							)}
							onPress={() => navigation.navigate('ScanQRCodeForMenu')}
						/>
					) : null}

					<SettingsItem
						style={{ padding: 16 }}
						title='Logout'
						left={(props) => <List.Icon {...props} color='black' icon='door' />}
						onPress={() => {
							alertConfirmLogout();
						}}
					/>
				</List.Section>
			</ScrollView>
		</SafeArea>
	);
};
