import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Button, Card, FAB, Searchbar, Surface } from 'react-native-paper';

const PRODUCTS = [
  { id: '1', title: 'Bel Aqua Medium (750ml)', price: 30.00 },
  { id: '2', title: 'Bel Aqua Small (500ml)', price: 25.00 },
  { id: '3', title: 'Awake Medium (750ml)', price: 28.00 },
  { id: '4', title: 'Awake Small (500ml)', price: 25.00 },
  { id: '5', title: 'Awake Small (500ml)', price: 25.00 },
  { id: '6', title: 'Awake Small (500ml)', price: 25.00 },
  { id: '7', title: 'Awake Small (500ml)', price: 25.00 },
];

export function ProductsScreen() {
  const [query, setQuery] = useState('');

  return (
    <Surface
      style={{ marginBottom: 150 }}
      elevation={0}>
      <Searchbar
        style={{ margin: 10 }}
        placeholder="Enter a product name to search for it!"
        onChangeText={setQuery}
        value={query}
      />
      <FlatList
        data={PRODUCTS}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title={item.title}
              subtitle={`GHS ${item.price}`}
              left={(props) => <Avatar.Image {...props} source={{ uri: 'https://picsum.photos/700' }} />}
            />
            <Card.Actions>
              <Button>Edit</Button>
              <Button>Delete</Button>
            </Card.Actions>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onPress={() => console.log('Pressed')}
      />
    </Surface>
  );
}
