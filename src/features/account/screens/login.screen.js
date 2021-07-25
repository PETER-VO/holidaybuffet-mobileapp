import React, { useContext, useState, useRef } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Spacer } from '../../../components/spacer/spacer.component';
import { ScrollView } from 'react-native';
import * as firebase from 'firebase';
import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	AuthInput,
	ErrorContainer,
	Title,
} from '../components/account.styles';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

export const LoginScreen = ({ navigation }) => {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [code, setCode] = useState('');
	const [verificationId, setVerificationId] = useState(null);
	const recaptchaVerifier = useRef(null);
	const firebaseConfig = firebase.apps.length
		? firebase.app().options
		: undefined;

	const { verificationPhoneNumber, verificationCode, error, isLoading } =
		useContext(AuthenticationContext);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<AccountBackground>
				<AccountCover />
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
				/>
				<Title>Meals To Go</Title>
				<AccountContainer>
					<AuthInput
						label="Phone Number"
						textContentType="emailAddress"
						keyboardType="phone-pad"
						autoCompleteType="tel"
						onChangeText={setPhoneNumber}
					/>
					<Spacer size="large">
						<AuthButton
							icon="lock-open-outline"
							mode="contained"
							onPress={() =>
								verificationPhoneNumber(phoneNumber, recaptchaVerifier.current)
							}
						>
							Send Verification
						</AuthButton>
					</Spacer>

					<AuthInput
						label="Confirmation Code"
						keyboardType="number-pad"
						onChangeText={setCode}
					/>
					<Spacer size="large">
						<AuthButton
							icon="lock-open-outline"
							mode="contained"
							onPress={() => verificationCode(code)}
						>
							Send Verification
						</AuthButton>
					</Spacer>
				</AccountContainer>
				<Spacer size="large">
					<AuthButton mode="contained" onPress={() => navigation.goBack()}>
						Back
					</AuthButton>
				</Spacer>
			</AccountBackground>
		</ScrollView>
	);
};
