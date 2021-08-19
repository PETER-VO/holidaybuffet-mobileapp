import React, { useContext, useState } from 'react';
import { List } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { ImageQRCode } from '../../../components/utils/imageQRCode.component';
import { ScrollView } from 'react-native';
import { removePhoneToken } from '../../../services/authentication/authentication.service';

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

export const SettingScreen = ({ navigation }) => {
	const { onLogout, user, removePhoneTokenForUser } = useContext(
		AuthenticationContext
	);

	const alertConfirmLogout = () => {
		Alert.alert('Do you want to logout', 'My Alert Msg', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => {
					setTimeout(() => {
						removePhoneTokenForUser();
					}, 120);
					setTimeout(() => {
						onLogout();
					}, 4000);
				},
			},
		]);
	};

	return (
		<SafeArea>
			<ScrollView>
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
					{/* <List.Accordion
					style={{ padding: 16 }}
					title='Credits'
					description={user.credits ? `${user.credits} coins` : '0 coins'}
					left={(props) => (
						<List.Icon
							{...props}
							color='black'
							style={{ marginLeft: 0 }}
							icon='piggy-bank'
						/>
					)}
					expanded={coinExpanded}
					onPress={() => setCoinExpanded(!coinExpanded)}
				>
					{array.map((e, i, a) => {
						return <CouponComponent key={i} />;
					})}
				</List.Accordion> */}
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
