import React, { useState, useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useEffect } from 'react/cjs/react.development';

export const InputOTPScreen = ({ navigation }) => {
	let textInput = useRef(null);
	let clockCall = null;
	const lengthInput = 6;
	const defaultCountDown = 5;
	const [internalVal, setInternalVal] = useState('');
	const [countDown, setCountDown] = useState(defaultCountDown);
	const [enableResend, setEnableResend] = useState(false);

	const onChangeText = (val) => {
		setInternalVal(val);
	};

	useEffect(() => {
		clockCall = setInterval(() => {
			decrementClock();
		}, 1000);
		return () => {
			clearInterval(clockCall);
		};
	});

	const decrementClock = () => {
		if (countDown === 0) {
			setEnableResend(true);
			setCountDown(0);
			clearInterval(clockCall);
		} else {
			setCountDown(countDown - 1);
		}
	};

	const onResendOTP = () => {
		if (enableResend) {
			setCountDown(defaultCountDown);
			setEnableResend(false);
			clearInterval(clockCall);
			clockCall = setInterval(() => {
				decrementClock(0);
			}, 1000);
		}
	};

	const onChangeNumber = () => {
		setInternalVal('');
	};

	useEffect(() => {
		setTimeout(() => {
			textInput.focus();
		}, 150);
	}, []);

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView
				keyboardVerticalOffset={50}
				behavior={'padding'}
				style={styles.containerAvoidingView}
			>
				<Text style={styles.textTitle}>Input your OTP code sent via SMS</Text>
				<View>
					<TextInput
						ref={(input) => (textInput = input)}
						onChangeText={onChangeText}
						style={{ width: 0, height: 0 }}
						value={internalVal}
						maxLength={lengthInput}
						returnKeyType='done'
						keyboardType='numeric'
					/>
					<View style={styles.containerInput}>
						{Array(lengthInput)
							.fill()
							.map((data, index) => (
								<View
									style={[
										styles.cellView,
										{
											borderBottomColor:
												index === internalVal.length ? '#FB6C6A' : '#234DB7',
										},
									]}
								>
									<Text
										style={styles.cellText}
										onPress={() => textInput.focus()}
									>
										{internalVal && internalVal.length > 0
											? internalVal[index]
											: ''}
									</Text>
								</View>
							))}
					</View>
				</View>
				<View style={styles.bottomView}>
					<TouchableOpacity onPress={onChangeNumber}>
						<View style={styles.btnChangeNumber}></View>
						<Text style={styles.textChange}>Change number</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={onResendOTP}>
						<View style={styles.btnResend}></View>
						<Text
							style={[
								styles.textReSend,
								{ color: enableResend ? '#234DB7' : 'gray' },
							]}
						>
							Resend OTP ({countDown})
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerAvoidingView: {
		flex: 1,
		alignItems: 'center',
		padding: 10,
	},
	textTitle: {
		marginTop: 50,
		marginBottom: 50,
		fontSize: 16,
	},
	containerInput: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cellView: {
		paddingVertical: 11,
		width: 40,
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1.5,
	},
	cellText: {
		textAlign: 'center',
		fontSize: 16,
	},
	bottomView: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 50,
		alignItems: 'flex-end',
	},
	btnChangeNumber: {
		width: 150,
		height: 50,
		borderRadius: 10,
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	textChange: {
		color: '#234DB7',
		alignItems: 'center',
		fontSize: 15,
	},
	btnResend: {
		width: 150,
		height: 50,
		borderRadius: 10,
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
	textReSend: {
		alignItems: 'center',
		fontSize: 15,
	},
});
