import React, { useContext } from 'react';
import { Avatar, List } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import styled from 'styled-components/native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Alert } from 'react-native';

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

export const SettingScreen = ({ navigation }) => {
	const { onLogout, user } = useContext(AuthenticationContext);

	const alertConfirmLogout = () =>
		Alert.alert(
			'Do you want to logout',
			'My Alert Msg',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{ text: 'OK', onPress: () => onLogout() },
			],
			{ cancelable: false }
		);

	return (
		<SafeArea>
			<AvatarContainer>
				<Avatar.Icon size={180} icon='human' backgroundColor='#2182BD' />
				<Spacer position='top' size='large'>
					<Text variant='label'>{user.email}</Text>
				</Spacer>
			</AvatarContainer>
			<List.Section>
				<SettingsItem
					style={{ padding: 16 }}
					title='Favourites'
					description='View your favourites'
					left={(props) => <List.Icon {...props} color='black' icon='heart' />}
					onPress={() => navigation.navigate('Favourites')}
				/>
				<SettingsItem
					style={{ padding: 16 }}
					title='Credits'
					description={user.credits ? `${user.credits} coins` : '0 coins'}
					left={(props) => (
						<List.Icon {...props} color='black' icon='piggy-bank' />
					)}
				/>
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
