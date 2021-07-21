import React, { useContext, useState } from 'react';
import { Spacer } from '../../../components/spacer/spacer.component';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import { Text } from '../../../components/typography/text.component';
import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton,
    AuthInput
} from '../components/account.styles';

export const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { onLogin, error } = useContext(AuthenticationContext);
    return (
        <AccountBackground>
            <AccountCover />
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
                        secure
                        onChangeText={(p) => setPassword(p)}
                    />
                </Spacer>
                {error && (
                    <Spacer size="large">
                        <Text variant="error">{error}</Text>
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
        </AccountBackground>

    )
}