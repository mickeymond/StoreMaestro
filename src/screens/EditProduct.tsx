import React, { useState } from 'react';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { AppStackParamList } from '../core/types';
import { View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface EditProductProps extends NativeStackScreenProps<AppStackParamList, 'EditProduct'> { }

export function EditProduct({ route }: EditProductProps) {
  const { product } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);

  const submit = () => {
    setLoading(true);
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .doc(product?.id)
      .update({ name, price, updatedAt: new Date() })
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
      <TextInput
        style={{ marginVertical: 15 }}
        label="Product Name"
        mode="outlined"
        autoCapitalize="words"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={{ marginVertical: 15 }}
        label="Product Price"
        mode="outlined"
        inputMode="decimal"
        value={price}
        onChangeText={text => setPrice(text)}
      />
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
          mode="contained" onPress={submit}
          disabled={!name || !price}>Submit</Button>
      </View>
    </Surface>
  );
}
