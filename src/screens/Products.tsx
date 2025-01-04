import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Button, Card, FAB, Modal, Searchbar, Surface } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AddProduct } from '../components';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { useDebounce } from 'use-debounce';

const PRODUCTS = [
  { id: '1', name: 'Bel Aqua Medium (750ml)', price: 30.00 },
  { id: '2', name: 'Bel Aqua Small (500ml)', price: 25.00 },
  { id: '3', name: 'Awake Medium (750ml)', price: 28.00 },
  { id: '4', name: 'Awake Small (500ml)', price: 25.00 },
  { id: '5', name: 'Awake Small (500ml)', price: 25.00 },
  { id: '6', name: 'Awake Small (500ml)', price: 25.00 },
  { id: '7', name: 'Awake Small (500ml)', price: 25.00 },
];

type Product = {
  id: string;
  name: string;
  price: string;
}

export function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [addingProduct, setAddingProduct] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection(PRODUCTS_COLLECTION)
      .where('name', '>=', debouncedQuery)
      .where('name', '<=', debouncedQuery + '~')
      .onSnapshot(documentSnapshot => {
        const products = documentSnapshot.docs.map(doc => {
          return { id: doc.id, name: doc.data().name, price: doc.data().price }
        });
        setProducts(products);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [debouncedQuery]);

  return (
    <Surface
      style={{ marginBottom: 150, minHeight: '100%' }}
      elevation={0}>
      <Searchbar
        style={{ margin: 10 }}
        placeholder="Enter a product name to search for it!"
        onChangeText={setQuery}
        value={query}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title={item.name}
              subtitle={`GHS ${item.price}`}
              left={(props) => <Avatar.Image
                {...props}
                source={{ uri: `https://avatar.iran.liara.run/username?username=${item.name}` }}
              />}
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
        onPress={() => setAddingProduct(true)}
      />
      <Modal
        visible={addingProduct}
        dismissable={false}
        onDismiss={() => setAddingProduct(false)}
        contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10 }}>
        <AddProduct dismissModal={() => setAddingProduct(false)} />
      </Modal>
    </Surface>
  );
}
