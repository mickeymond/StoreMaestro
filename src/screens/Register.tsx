import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { USERS_COLLECTION } from '../core/constants';

export function RegisterScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('User account created & signed in!');
        // Create user record for account
        return firestore()
          .collection(USERS_COLLECTION)
          .add({
            userId: userCredential.user.uid,
            name,
            email,
            role: 'attendant',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
      })
      .then(() => {
        navigation.dispatch(StackActions.replace("Root"));
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>
          Create a StoreMaestro Account
        </Text>
        <TextInput
          style={{ marginVertical: 15 }}
          label="Enter Full Name"
          mode="outlined"
          inputMode="text"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />
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
          onPress={register}
          loading={loading}
          mode="contained">CREATE ACCOUNT</Button>
        <Button
          onPress={() => navigation.dispatch(StackActions.replace("Login"))}
        >Already have an account? Login.</Button>
      </View>
    </Surface>
  );
}
