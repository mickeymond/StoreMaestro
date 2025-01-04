import React from 'react';
import { View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export function HomeScreen() {
  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ textAlign: 'center' }}>Home Screen</Text>
      </View>
    </Surface>
  );
}
