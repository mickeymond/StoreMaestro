import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { onGoogleButtonPress } from '../core/google-auth';
import { Controller, FieldValues, useForm } from 'react-hook-form';

export function LoginScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const login = ({ email, password }: FieldValues) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        // console.log('User signed in!');
        navigation.dispatch(StackActions.replace('Root'));
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          // console.log('That email address is invalid!');
        }

        console.error(error);
        // Disable loader
        setLoading(false);
      });
  };

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      elevation={0}>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 24 }}>
          Welcome back to StoreMaestro
        </Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginVertical: 15 }}
              label="Enter Unique Email"
              mode="outlined"
              inputMode="email"
              autoCapitalize="none"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
        />
        {errors.email && <Text>Email is required.</Text>}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ marginVertical: 15 }}
              label="Enter Secure Password"
              mode="outlined"
              autoCapitalize="none"
              secureTextEntry
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="password"
        />
        {errors.password && <Text>Password is required.</Text>}
        <Button
          style={{ marginVertical: 15 }}
          disabled={!isValid}
          onPress={handleSubmit(login)}
          loading={loading}
          mode="contained">LOG IN</Button>
        <Button
          style={{ marginVertical: 15 }}
          onPress={() => navigation.dispatch(StackActions.replace('Register'))}
        >New to StoreMaestro? Create An Account.</Button>
        <Button
          style={{ marginVertical: 15 }}
          mode="contained"
          icon="google"
          onPress={() => {
            onGoogleButtonPress()
              .then(() => {
                // console.log('Signed in with Google!');
                navigation.dispatch(StackActions.replace('Root'));
              })
              .catch(error => {
                console.error(error);
              });
          }}
        >Login with Google</Button>
      </View>
    </Surface>
  );
}
