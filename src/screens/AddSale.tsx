import React, { useEffect, useState } from 'react';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-paper-dropdown';
import { PRODUCTS_COLLECTION, SALES_COLLECTION } from '../core/constants';
import { Product } from '../core/types';
import { View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';

export function AddSale() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const submit = () => {
    setLoading(true);
    firestore()
      .collection(SALES_COLLECTION)
      .add({ productId, price, quantity, createdAt: new Date(), updatedAt: new Date() })
      .then(() => {
        // console.log('Sale added!');
        navigation.dispatch(StackActions.pop());
      })
      .catch(error => {
        console.log(error);
        // Disable loader
        setLoading(false);
      });
  };

  useEffect(() => {
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .get()
      .then(snapshot => {
        const products = snapshot.docs.map(doc => {
          return { id: doc.id, name: doc.data().name, price: doc.data().price };
        });
        setProducts(products);
      });
  }, []);

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10 }}
      elevation={0}>
      <Text
        style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30, marginVertical: 15 }}>
        Add New Sale
      </Text>
      <Dropdown
        label="Product"
        mode="outlined"
        placeholder="Select Product"
        options={products.map(({ id, name, price }) => ({ label: `${name} - GHS ${price}`, value: id }))}
        value={productId}
        onSelect={value => {
          if (value) {
            setProductId(value);
            setPrice(products.find(({ id }) => id === value)?.price || '0');
          }
        }}
      />
      <TextInput
        style={{ marginVertical: 15 }}
        label="Price"
        mode="outlined"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={{ marginVertical: 15 }}
        label="Quantity"
        mode="outlined"
        inputMode="numeric"
        value={quantity}
        onChangeText={setQuantity}
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
          disabled={!productId || !price || !quantity}>Submit</Button>
      </View>
    </Surface>
  );
}
