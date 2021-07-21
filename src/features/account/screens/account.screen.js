import React from 'react';

import { Button } from 'react-native-paper';
import { Spacer } from '../../../components/spacer/spacer.component';

import {
    AccountBackground,
    AccountCover,
    AccountContainer,
    AuthButton
} from '../components/account.styles';

export const AccountScreen = () => {

    return (
        <AccountBackground>
            <AccountCover />
            <AccountContainer>
                <AuthButton
                    icon="lock-open-outline"
                    mode="contained"
                    onPress={() => console.log('press')}
                >
                    Login
                </AuthButton>
                <Spacer size='large'>
                    <AuthButton
                        icon="lock-open-outline"
                        mode="contained"
                        onPress={() => console.log('press')}
                    >
                        Register
                </AuthButton>
                </Spacer>
            </AccountContainer>
        </AccountBackground>
    )
}