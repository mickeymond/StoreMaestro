import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

export function HomeScreen() {
  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ fontSize: 24, textAlign: 'center' }}>Welcome to StoreMaestro</Text>
      </View>
      <ImageBackground
        source={require('../assets/images/undraw_under-construction_c2y1.png')}
        resizeMode="center"
        style={{ height: '60%' }} />
    </Surface>
  );
}
