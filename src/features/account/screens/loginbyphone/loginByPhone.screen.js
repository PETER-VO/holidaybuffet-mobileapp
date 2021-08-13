import React, { useContext, useState, useRef, useEffect } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { ScrollView, View } from 'react-native';
import * as firebase from 'firebase';
import { ActivityIndicator, Colors } from 'react-native-paper';
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

	const POSTAL_CODE = '+358';

	const [phoneNumber, setPhoneNumber] = useState('');
	const [focusInput, setFocusInput] = useState(true);
	const [code, setCode] = useState('');
	const [move, setMove] = useState(false);
	const [checkForm, setCheckForm] = useState(false);
	const [inputRef, setInputRef] = useState(null);
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
			setToggle(true);
			setTimeout(() => {
				setToggle(false);
				setMove(true);
			}, 2000);
		}
	});

	useEffect(() => {
		if (move) {
			setMove(false);
			//TODO: find out another way to trigger this without having to create a new state of move
			navigation.navigate('InputOTP', {
				phoneNumber: `${POSTAL_CODE}${phoneNumber}`,
			});
		}
	}, [move]);

	// useEffect(() => {
	// 	if (inputRef) {
	// 		setTimeout(() => inputRef.focus(), 200);
	// 	}
	// }, [inputRef]);

	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<AccountBackground>
				<AccountCover />
				<FirebaseRecaptchaVerifierModal
					ref={recaptchaVerifier}
					firebaseConfig={firebaseConfig}
					attemptInvisibleVerification={false}
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
							ref={(input) => input && setInputRef(input)}
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
					{!toggle ? (
						<AuthButton
							icon='lock-open-outline'
							style={{
								backgroundColor: phoneNumber ? '#2182BD' : 'gray',
							}}
							disabled={!phoneNumber}
							mode='contained'
							onPress={async () => {
								verificationPhoneNumber(
									`${POSTAL_CODE}${phoneNumber}`,
									recaptchaVerifier.current
								);
								setToggle(true);
							}}
						>
							Send Verification
						</AuthButton>
					) : (
						<ActivityIndicator animating={true} color={Colors.blue300} />
					)}
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
