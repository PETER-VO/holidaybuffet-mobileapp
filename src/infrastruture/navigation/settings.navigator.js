import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { SettingScreen } from '../../features/settings/screens/settings.screen';
import { FavouritesScreen } from '../../features/settings/screens/favourties.screen';
import { CameraScreen } from '../../features/settings/screens/camera.screen';


const SettingsStack = createStackNavigator();

export const SettingNavigator = ({ route, navigation }) => {
    return (
        <SettingsStack.Navigator
            headerMode="screen"
            screenOptions={{
                CardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
        >
            <SettingsStack.Screen
                options={{
                    header: () => null,
                }}
                name="Settings"
                component={SettingScreen}
            />
            <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
            {/* <SettingsStack.Screen name="Camera" component={CameraScreen} /> */}
        </SettingsStack.Navigator>
    )
}