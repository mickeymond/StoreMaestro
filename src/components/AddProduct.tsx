import React, { useState } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';

export function AddProduct({ dismissModal }: {
  dismissModal: Function
}) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const submit = () => {
    // console.log('Submitting product!');
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .add({ name, price, createdAt: new Date(), updatedAt: new Date() })
      .then(() => {
        // console.log('Product added!');
        dismissModal();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30 }}
        title="Add New Product" />
      <Card.Content>
        <TextInput
          style={{ marginVertical: 15 }}
          label="Product Name"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
        />
        <TextInput
          style={{ marginVertical: 15 }}
          label="Product Price"
          mode="outlined"
          value={price}
          onChangeText={text => setPrice(text)}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => dismissModal()}>Cancel</Button>
        <Button onPress={submit} disabled={!name || !price}>Submit</Button>
      </Card.Actions>
    </Card>
  );
}
