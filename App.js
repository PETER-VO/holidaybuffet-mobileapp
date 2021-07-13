import React from 'react';
import { StatusBar as ExpostatusBar } from 'expo-status-bar';
import { useFonts as useOswald, Oswald_400Regular } from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { ThemeProvider } from 'styled-components/native';

import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen.';
import { theme } from './src/infrastruture/theme';

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <RestaurantsScreen />
      </ThemeProvider>
      <ExpostatusBar style="auto" />
    </>
  );
}
