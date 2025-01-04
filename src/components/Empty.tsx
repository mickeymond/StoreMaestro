import React from 'react';
import { Image } from 'react-native';

export function Empty() {
  return (
    <Image
      style={{ width: '70%', height: 300, margin: 'auto' }}
      source={require('../assets/images/undraw_no-data_ig65.png')}
    />
  );
}
