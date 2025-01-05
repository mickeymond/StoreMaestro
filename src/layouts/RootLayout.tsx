import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { HomeScreen, ProductsScreen, SalesScreen, SettingsScreen } from '../screens';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-paper';

const Tab = createBottomTabNavigator();

export function RootLayout() {
  const navigation = useNavigation();

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    // console.log(user);
    if (!user) {
      navigation.dispatch(StackActions.replace('Login'));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  });

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Icon source="home" size={size} color={color} />;
          }
          if (route.name === 'Products') {
            return <Icon source="package" size={size} color={color} />;
          }
          if (route.name === 'Sales') {
            return <Icon source="sale" size={size} color={color} />;
          }
          if (route.name === 'Settings') {
            return <Icon source="cog" size={size} color={color} />;
          }
          return <Icon source="home" size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Products" component={ProductsScreen} />
      <Tab.Screen name="Sales" component={SalesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
