import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProductsScreen, SalesScreen, SettingsScreen } from '../screens';
import { ActivityIndicator, Icon } from 'react-native-paper';
import { useUser } from '../hooks/user';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

export function RootLayout() {
  const { user } = useUser();

  if (!user) {return (
    <View style={{
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <ActivityIndicator size="large" />
    </View>
  );}

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
