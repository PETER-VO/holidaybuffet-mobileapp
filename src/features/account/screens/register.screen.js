import React, { useContext, useState } from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text } from '../../../components/typography/text.component';
import { ActivityIndicator, Colors } from 'react-native-paper';
import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	AuthInput,
	ErrorContainer,
	Title,
} from '../components/account.styles';
import { ScrollView } from 'react-native';
import { SafeArea } from '../../../components/utils/safe-area.component';

export const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatedPassword, setRepeatedPassword] = useState('');
	const { onRegister, isLoading, error } = useContext(AuthenticationContext);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<AccountBackground>
				<AccountCover />

				<Title>Meals To Go</Title>
				<AccountContainer>
					<AuthInput
						label='E-mail'
						value={email}
						textContentType='emailAddress'
						keyboardType='email-address'
						autoCaptialize='none'
						onChangeText={(u) => setEmail(u)}
					/>
					<Spacer size='large'>
						<AuthInput
							label='password'
							value={password}
							textContentType='password'
							secureTextEntry
							autoCaptialize='none'
							onChangeText={(p) => setPassword(p)}
						/>
					</Spacer>
					<Spacer size='large'>
						<AuthInput
							label='Repeat Password'
							value={repeatedPassword}
							textContentType='password'
							secureTextEntry
							autoCaptialize='none'
							onChangeText={(p) => setRepeatedPassword(p)}
						/>
					</Spacer>

					{error && (
						<Spacer size='large'>
							<ErrorContainer>
								<Text variant='error'>{error}</Text>
							</ErrorContainer>
						</Spacer>
					)}
					<Spacer size='large'>
						{!isLoading ? (
							<AuthButton
								icon='mail'
								mode='contained'
								onPress={() => onRegister(email, password, repeatedPassword)}
							>
								Register
							</AuthButton>
						) : (
							<ActivityIndicator animating={true} color={Colors.blue300} />
						)}
					</Spacer>
				</AccountContainer>
				<Spacer size='large'>
					<AuthButton mode='contained' onPress={() => navigation.goBack()}>
						Back
					</AuthButton>
				</Spacer>
			</AccountBackground>
		</ScrollView>
	);
};
