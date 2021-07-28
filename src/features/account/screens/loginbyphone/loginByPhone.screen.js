import React, { useContext, useState, useRef, useEffect } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Spacer } from '../../../../components/spacer/spacer.component';
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
	PhoneInput,
	ContainerPhoneInput,
	SubText,
} from '../../components/account.styles';
import { AuthenticationContext } from '../../../../services/authentication/authentication.context';
import { Text } from '../../../../components/typography/text.component';

export const LoginByPhoneScreen = ({ navigation }) => {
	let textInput = useRef(null);
	const postalCode = '+358';
	const [phoneNumber, setPhoneNumber] = useState('');
	const [focusInput, setFocusInput] = useState(true);
	const [code, setCode] = useState('');
	const recaptchaVerifier = useRef(null);
	const [toggle, setToggle] = useState(false);
	const firebaseConfig = firebase.apps.length
		? firebase.app().options
		: undefined;

	const {
		verificationPhoneNumber,
		verificationId,
		verificationCode,
		error,
		isLoading,
		clearError,
	} = useContext(AuthenticationContext);

	const onChangePhone = (number) => setPhoneNumber(number);

	useEffect(() => {
		if (toggle && verificationId) {
			setToggle(false);
			navigation.navigate('InputOTP', {
				phoneNumber: `${postalCode}${phoneNumber}`,
			});
		}
	});

	useEffect(() => {
		setTimeout(() => textInput.focus(), 150);
	}, []);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<AccountBackground>
				<AccountCover />
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
				/>
				<Title>Holiday Buffet</Title>
				<AccountContainer>
					<ContainerPhoneInput
						style={{
							borderBottomColor: focusInput ? '#244DB7' : '#ffffff',
						}}
					>
						<SubText>+358 |</SubText>
						<PhoneInput
							ref={(input) => (textInput = input)}
							placeholder='41 750 3319'
							keyboardType='numeric'
							onChangePhone
							value={phoneNumber}
							onChangeText={onChangePhone}
							secureTextEntry={false}
						/>
					</ContainerPhoneInput>
					{error && (
						<Spacer size='large'>
							<ErrorContainer>
								<Text variant='error'>{error}</Text>
							</ErrorContainer>
						</Spacer>
					)}
					<Spacer size='large'>
						<AuthButton
							icon='lock-open-outline'
							style={{
								backgroundColor: phoneNumber ? '#2182BD' : 'gray',
							}}
							disabled={!phoneNumber}
							mode='contained'
							onPress={async () => {
								verificationPhoneNumber(
									`${postalCode}${phoneNumber}`,
									recaptchaVerifier.current
								);
								setToggle(true);
							}}
						>
							Send Verification
						</AuthButton>
					</Spacer>
				</AccountContainer>
				<Spacer size='large'>
					<AuthButton
						mode='contained'
						onPress={() => {
							navigation.goBack();
							clearError();
						}}
					>
						Back
					</AuthButton>
				</Spacer>
			</AccountBackground>
		</ScrollView>
	);
};
