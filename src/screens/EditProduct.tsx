import React, { useState } from 'react';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { AppStackParamList } from '../core/types';
import { View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Controller, FieldValues, useForm } from 'react-hook-form';

interface EditProductProps extends NativeStackScreenProps<AppStackParamList, 'EditProduct'> { }

export function EditProduct({ route }: EditProductProps) {
  const { product } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { name: product?.name, price: product?.price, altPrice: product?.altPrice },
  });

  const submit = ({ name, price, altPrice }: FieldValues) => {
    setLoading(true);
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .doc(product?.id)
      .update({ name, price, altPrice, updatedAt: Date.now() })
      .then(() => {
        // console.log('Product added!');
        navigation.dispatch(StackActions.pop());
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      elevation={0}>
      <Text
        style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30, marginVertical: 15 }}>
        Edit - {product?.name}
      </Text>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Name"
            mode="outlined"
            autoCapitalize="words"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="name"
      />
      {errors.name && <Text>Name is required.</Text>}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Price"
            mode="outlined"
            inputMode="decimal"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="price"
      />
      {errors.price && <Text>Price is required.</Text>}
      <Controller
        control={control}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Alt Price"
            mode="outlined"
            inputMode="decimal"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="altPrice"
      />
      {errors.altPrice && <Text>Alt price is required.</Text>}
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
        <Button
          style={{ width: '45%' }}
          buttonColor="red" mode="contained"
          disabled={loading}
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}>Cancel</Button>
        <Button
          style={{ width: '45%' }}
          loading={loading}
          mode="contained" onPress={handleSubmit(submit)}
          disabled={!isValid}>Submit</Button>
      </View>
    </Surface>
  );
}
