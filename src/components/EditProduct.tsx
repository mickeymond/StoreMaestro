import React, { useState } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { Product } from '../core/types';

export function EditProduct({ product, dismissModal }: {
  product: Product,
  dismissModal: Function
}) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);

  const submit = () => {
    // console.log('Submitting product!');
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .doc(product.id)
      .update({ name, price })
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
        title={`Edit - ${product.name}`} />
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
