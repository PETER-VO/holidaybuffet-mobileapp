import React, { useContext } from 'react';
import { Avatar, List } from 'react-native-paper';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { SafeArea } from '../../../components/utils/safe-area.component';
import styled from 'styled-components/native';
import { Spacer } from '../../../components/spacer/spacer.component';
import { Text } from '../../../components/typography/text.component';
import { TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const SettingsItem = styled(List.Item)`
	padding: ${(props) => props.theme.space[3]};
`;

const AvatarContainer = styled.View`
	align-items: center;
`;

export const SettingScreen = ({ navigation }) => {
	const { onLogout, user } = useContext(AuthenticationContext);
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
					description='7 coins'
					left={(props) => (
						<List.Icon {...props} color='black' icon='piggy-bank' />
					)}
				/>
				<SettingsItem
					style={{ padding: 16 }}
					title='Logout'
					left={(props) => <List.Icon {...props} color='black' icon='door' />}
					onPress={onLogout}
				/>
			</List.Section>
		</SafeArea>
	);
};
