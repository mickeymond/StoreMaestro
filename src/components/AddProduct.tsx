import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Button, Card, TextInput } from 'react-native-paper';


export function AddProduct({ dismissModal }: {
  dismissModal: ((e: GestureResponderEvent) => void) | undefined
}) {
  return (
    <Card>
      <Card.Title
        titleStyle={{ fontWeight: "bold", textAlign: "center", fontSize: 18, marginTop: 30 }}
        title="Add New Product" />
      <Card.Content>
        <TextInput
          style={{ marginVertical: 15 }}
          label="Product Name"
          mode="outlined"
        // value={text}
        // onChangeText={text => setText(text)}
        />
        <TextInput
          style={{ marginVertical: 15 }}
          label="Product Price"
          mode="outlined"
        // value={text}
        // onChangeText={text => setText(text)}
        />
      </Card.Content>
      <Card.Actions>
        <Button onPress={dismissModal}>Cancel</Button>
        <Button>Save</Button>
      </Card.Actions>
    </Card>
  );
}
