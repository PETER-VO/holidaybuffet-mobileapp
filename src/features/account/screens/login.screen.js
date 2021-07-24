import React, { useContext, useState } from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text } from '../../../components/typography/text.component';
import { ScrollView } from "react-native";
import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title
} from '../components/account.styles';
import { ActivityIndicator, Colors } from "react-native-paper";

export const LoginScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
            .then(setVerificationId);
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase
            .auth()
            .signInWithCredential(credential)
            .then((result) => {
                console.log(result);
            });
    };


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
                    <Spacer size='large'>
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={sendVerification}
                        >
                            Send Verification
                        </AuthButton>
                    </Spacer>

                    <AuthInput
                        label="Confirmation Code"
                        keyboardType="number-pad"
                        onChangeText={setCode}
                    />
                    <Spacer size='large'>
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={confirmCode}
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
    )
}