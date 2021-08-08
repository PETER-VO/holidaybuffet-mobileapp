import React, { useContext, useState } from 'react';
import { List } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { ImageQRCode } from '../../../components/utils/imageQRCode.component';

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

export const SettingScreen = ({ navigation }) => {
	const [coinExpanded, setCoinExpanded] = useState(false);
	const [array, setArray] = useState([1, 2, 3]);
	const { onLogout, user } = useContext(AuthenticationContext);

	const alertConfirmLogout = () =>
		Alert.alert('Do you want to logout', 'My Alert Msg', [
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

	return (
		<SafeArea>
			<AvatarContainer style={{ padding: 30 }}>
				<ImageQRCode value='hello' style={{ marginBottom: 0 }} />
			</AvatarContainer>
			<List.Section>
				<SettingsItem
					style={{ padding: 16 }}
					title='Favourites'
					description='View your favourites'
					left={(props) => <List.Icon {...props} color='black' icon='heart' />}
					onPress={() => navigation.navigate('Favourites')}
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
				{user.role === 'admin' ? (
					<>
						<SettingsItem
							style={{ padding: 16 }}
							title='General Management'
							description='Inform something'
							left={(props) => (
								<List.Icon {...props} color='black' icon='bullhorn' />
							)}
							onPress={() => navigation.navigate('ManagementControl')}
						/>
						<SettingsItem
							style={{ padding: 16 }}
							title='General Management'
							description='Inform something'
							left={(props) => (
								<List.Icon {...props} color='black' icon='qrcode-scan' />
							)}
							onPress={() => navigation.navigate('ScanQRCode')}
						/>
					</>
				) : null}

				<SettingsItem
					style={{ padding: 16 }}
					title='Logout'
					left={(props) => <List.Icon {...props} color='black' icon='door' />}
					onPress={alertConfirmLogout}
				/>
			</List.Section>
		</SafeArea>
	);
};
