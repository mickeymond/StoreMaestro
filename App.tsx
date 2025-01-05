/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootLayout } from './src/layouts';
import { LoginScreen, RegisterScreen } from './src/screens';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // Configure Google Sign In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Root" component={RootLayout} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
