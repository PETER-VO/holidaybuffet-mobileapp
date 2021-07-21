import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { theme } from "./src/infrastruture/theme";
import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { Navigation } from "./src/infrastruture/navigation";
import { FavouritesContextProvider } from './src/services/favourites/favourites.context';
import * as firebase from 'firebase';
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG-VnlnobLlJAOUvKYsuSxmCNZSveYnYg",
  authDomain: "mealstogo-4bcab.firebaseapp.com",
  projectId: "mealstogo-4bcab",
  storageBucket: "mealstogo-4bcab.appspot.com",
  messagingSenderId: "202467037900",
  appId: "1:202467037900:web:f65cfd183e75e5a04fa869",
  measurementId: "G-GNGJSN6H6L"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      firebase.auth().signInWithEmailAndPassword("ducphong030699@gmail.com", "3759350")
        .then(user => {
          setIsAuthenticated(true);
        }).catch(error => {
          console.log(error);
        });
    }, 2000);
  }, [])

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  if (!isAuthenticated) return null;
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <FavouritesContextProvider>
            <LocationContextProvider>
              <RestaurantsContextProvider>
                <Navigation />
              </RestaurantsContextProvider>
            </LocationContextProvider>
          </FavouritesContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}