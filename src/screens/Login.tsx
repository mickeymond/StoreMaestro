import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setLoading(false));
  };

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    // console.log(user);
    if (user) {
      navigation.dispatch(StackActions.replace('Root'));
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>
          Welcome back to StoreMaestro
        </Text>
        <TextInput
          style={{ marginVertical: 15 }}
          label="Enter Unique Email"
          mode="outlined"
          inputMode="email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={{ marginVertical: 15 }}
          label="Enter Secure Password"
          mode="outlined"
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          style={{ marginVertical: 15 }}
          disabled={!email || !password}
          onPress={login}
          loading={loading}
          mode="contained">LOG IN</Button>
        <Button
          onPress={() => navigation.dispatch(StackActions.replace('Register'))}
        >New to StoreMaestro? Create An Account.</Button>
      </View>
    </Surface>
  );
}
