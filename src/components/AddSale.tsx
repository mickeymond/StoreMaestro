import React, { useEffect, useState } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { Dropdown } from 'react-native-paper-dropdown';
import { PRODUCTS_COLLECTION, SALES_COLLECTION } from '../core/constants';
import { Product } from '../core/types';

export function AddSale({ dismissModal }: {
  dismissModal: Function
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const submit = () => {
    console.log('Submitting sale!');
    firestore()
      .collection(SALES_COLLECTION)
      .add({ productId, price, quantity, createdAt: new Date(), updatedAt: new Date() })
      .then(() => {
        console.log('Sale added!');
        dismissModal();
      })
      .catch(error => {
        console.log(error);
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
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30 }}
        title="Add New Sale" />
      <Card.Content>
        <Dropdown
          label="Product"
          mode="outlined"
          placeholder="Select Product"
          options={products.map(({ id, name }) => ({ label: name, value: id }))}
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
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => dismissModal()}>Cancel</Button>
        <Button onPress={submit} disabled={!productId || !price || !quantity}>Submit</Button>
      </Card.Actions>
    </Card>
  );
}
