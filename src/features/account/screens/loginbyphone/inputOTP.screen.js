import React, { useContext, useState, useRef, useEffect } from 'react';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { Spacer } from '../../../../components/spacer/spacer.component';
import { ScrollView, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import {
	AccountBackground,
	AccountCover,
	AccountContainer,
	AuthButton,
	AuthInput,
	ErrorContainer,
	Title,
	ContainerInput,
	CellView,
	CellText,
	ViewInput,
	CodeInput,
} from '../../components/account.styles';
import { Text } from '../../../../components/typography/text.component';
import { AuthenticationContext } from '../../../../services/authentication/authentication.context';

export const InputOTPScreen = ({ navigation, route }) => {
	let textInput = useRef(null);
	let clockCall = null;
	const lengthInput = 6;
	const defaultCountDown = 5;
	const [countDown, setCountDown] = useState(defaultCountDown);
	const recaptchaVerifier = useRef(null);
	const [enableResend, setEnableResend] = useState(false);
	const [code, setCode] = useState('');
	const firebaseConfig = firebase.apps.length
		? firebase.app().options
		: undefined;
	const {
		verificationCode,
		error,
		isLoading,
		verificationPhoneNumber,
		clearError,
	} = useContext(AuthenticationContext);

	const decrementClock = () => {
		if (countDown === 0) {
			setEnableResend(true);
			setCountDown(0);
			clearInterval(clockCall);
		} else {
			setCountDown(countDown - 1);
		}
	};

	const resendOTP = () => {
		const phoneNumber = route.params.phoneNumber;
		verificationPhoneNumber(phoneNumber, recaptchaVerifier.current);
	};

	const onResendOTP = () => {
		if (enableResend) {
			resendOTP();
			verificationCode(code);
			setCountDown(defaultCountDown);
			setEnableResend(false);
			clearInterval(clockCall);
			clockCall = setInterval(() => {
				decrementClock(0);
			}, 1000);
		}
	};

	useEffect(() => {
		clockCall = setInterval(() => {
			decrementClock();
		}, 1000);
		return () => {
			clearInterval(clockCall);
		};
	});

	useEffect(() => {
		if (code.length === 6) {
			verificationCode(code);
		}
	}, [code]);

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
					<ViewInput>
						<CodeInput
							ref={(input) => {
								textInput = input;
							}}
							onChangeText={(n) => setCode(n)}
							style={{ width: 0, height: 0 }}
							value={code}
							maxLength={lengthInput}
							returnKeyType='done'
							keyboardType='numeric'
							autoFocus={true}
						/>
						<TouchableOpacity
							onPress={() => {
								textInput.focus();
							}}
						>
							<ContainerInput>
								{Array(lengthInput)
									.fill()
									.map((data, index) => (
										<CellView
											key={index}
											style={{
												borderBottomColor:
													index === code.length - 1 ? '#2182BD' : '#gray',
											}}
										>
											<CellText>
												{code && code.length > 0 ? code[index] : ''}
											</CellText>
										</CellView>
									))}
							</ContainerInput>
						</TouchableOpacity>
					</ViewInput>
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
							style={{ backgroundColor: enableResend ? '#2182BD' : 'gray' }}
							disabled={!enableResend}
							mode='contained'
							onPress={() => {
								onResendOTP();
							}}
						>
							Resend OTP ({countDown})
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
