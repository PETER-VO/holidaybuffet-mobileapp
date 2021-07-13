import React from 'react';
import { StatusBar as ExpostatusBar } from 'expo-status-bar';
import { RestaurantsScreen } from './src/features/restaurants/screens/restaurants.screen.';

export default function App() {
  return (
    <>
      <RestaurantsScreen />
      <ExpostatusBar style="auto" />
    </>
  );
}
