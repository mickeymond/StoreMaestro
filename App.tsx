/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { View } from 'react-native';
import { Appbar, PaperProvider, Text, TouchableRipple } from 'react-native-paper';


function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <View>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => { }} />
          <Appbar.Content title="Title" />
          <Appbar.Action icon="calendar" onPress={() => { }} />
          <Appbar.Action icon="magnify" onPress={() => { }} />
        </Appbar.Header>
        <TouchableRipple
          onPress={() => console.log('Pressed')}
          rippleColor="rgba(0, 0, 0, .32)"
        >
          <Text>Press anywhere</Text>
        </TouchableRipple>
      </View>
    </PaperProvider>
  );
}

export default App;
