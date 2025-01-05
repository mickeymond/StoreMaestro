import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useUser } from '../hooks/user';

export function SettingsScreen() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        // console.log('User signed out!');
      })
      .catch(() => setLoading(false));
  };

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column' }}
      elevation={0}>
      <View>
        <Text
          style={{ textAlign: 'center', fontSize: 24, marginVertical: 15 }}>
          User Information
        </Text>
        <Text
          style={{ fontSize: 18, marginVertical: 15 }}>
          Full Name: {user?.name}
        </Text>
        <Text
          style={{ fontSize: 18, marginVertical: 15 }}>
          Email: {user?.email}
        </Text>
        <Text
          style={{ fontSize: 18, marginVertical: 15 }}>
          Role: {user?.role}
        </Text>
        <Button
          style={{ marginVertical: 15, width: '50%', alignSelf: 'center' }}
          onPress={logout}
          loading={loading}
          mode="contained">LOG OUT</Button>
      </View>
    </Surface>
  );
}
