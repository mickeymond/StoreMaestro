import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

export function SettingsScreen() {
  const [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .finally(() => setLoading(false));
  }

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>Settings Screen</Text>
        <Button
          style={{ marginVertical: 15 }}
          onPress={logout}
          loading={loading}
          mode="contained">LOG OUT</Button>
      </View>
    </Surface>
  );
}
