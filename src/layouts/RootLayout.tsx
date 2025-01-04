import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import { HomeScreen, ProductsScreen, SalesScreen, SettingsScreen } from '../screens';
import { StackActions, useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export function RootLayout() {
  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    // console.log(user);
    if (!user) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Sales" component={SalesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
