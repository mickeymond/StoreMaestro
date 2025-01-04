import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Button, Card, FAB, Modal, Portal, Searchbar, Surface } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AddProduct, EditProduct } from '../components';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { useDebounce } from 'use-debounce';
import { Product } from '../core/types';

export function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

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
              <Button
                onPress={() => {
                  setProductToEdit(item);
                  setIsModalOpen(true);
                }}>Edit</Button>
              {/* <Button>Delete</Button> */}
            </Card.Actions>
          </Card>
        )}
        keyExtractor={item => item.id}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onPress={() => setIsModalOpen(true)}
      />
      <Portal>
        <Modal
          visible={isModalOpen}
          dismissable={false}
          contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10 }}>
          {!productToEdit ?
            <AddProduct
              dismissModal={() => setIsModalOpen(false)} /> :
            <EditProduct
              product={productToEdit}
              dismissModal={() => {
                setIsModalOpen(false);
                setProductToEdit(null);
              }} />}
        </Modal>
      </Portal>
    </Surface>
  );
}
