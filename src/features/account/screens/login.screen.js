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

export const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, error } = useContext(AuthenticationContext);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <AccountBackground>
                <AccountCover />
                <Title>Meals To Go</Title>
                <AccountContainer>
                    <AuthInput
                        label="E-mail"
                        value={email}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCaptialize="none"
                        onChangeText={(u) => setEmail(u)}
                    />
                    <Spacer size='large'>
                        <AuthInput
                            label="password"
                            value={password}
                            textContentType="password"
                            secureTextEntry
                            autoCaptialize="none"
                            onChangeText={(p) => setPassword(p)}
                        />
                    </Spacer>
                    {error && (
                        <Spacer size="large">
                            <ErrorContainer>
                                <Text variant="error">{error}</Text>
                            </ErrorContainer>
                        </Spacer>
                    )}
                    <Spacer size='large'>
                        <AuthButton
                            icon="lock-open-outline"
                            mode="contained"
                            onPress={() => onLogin(email, password)}
                        >
                            Login
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