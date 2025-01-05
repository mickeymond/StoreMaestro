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
import crashlytics from '@react-native-firebase/crashlytics';
import { RootLayout } from './src/layouts';
import { AddProduct, AddSale, EditProduct, LoginScreen, RegisterScreen } from './src/screens';
import { AppStackParamList } from './src/core/types';

const AppStack = createNativeStackNavigator<AppStackParamList>();

function App(): React.JSX.Element {
  crashlytics().log('App mounted.');
  // Configure Google Sign In
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen name="Root" component={RootLayout} />
          <AppStack.Screen name="Login" component={LoginScreen} />
          <AppStack.Screen name="Register" component={RegisterScreen} />
          <AppStack.Screen name="AddProduct" component={AddProduct} />
          <AppStack.Screen name="EditProduct" component={EditProduct} />
          <AppStack.Screen name="AddSale" component={AddSale} />
        </AppStack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
