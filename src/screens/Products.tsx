import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Button, Card, FAB, IconButton, Searchbar, Surface } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { useDebounce } from 'use-debounce';
import { Product } from '../core/types';
import { useUser } from '../hooks/user';
import { StackActions, useNavigation } from '@react-navigation/native';

export function ProductsScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);

  useEffect(() => {
    const subscriber = firestore()
      .collection(PRODUCTS_COLLECTION)
      .where('name', '>=', debouncedQuery)
      .where('name', '<=', debouncedQuery + '~')
      .onSnapshot(documentSnapshot => {
        const products = documentSnapshot.docs.map(doc => {
          return { id: doc.id, name: doc.data().name, price: doc.data().price };
        });
        setProducts(products);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [debouncedQuery]);

  return (
    <>
      <Surface
        style={{ marginBottom: 150, minHeight: '100%' }}
        elevation={0}>
        <Searchbar
          style={{ margin: 10 }}
          placeholder="Enter a product name to search for it!"
          onChangeText={setQuery}
          autoCapitalize="words"
          value={query} />
        <FlatList
          data={products}
          style={{ flexGrow: 1, flex: 1, marginBottom: 60 }}
          renderItem={({ item }) => (
            <Card style={{ margin: 10 }}>
              <Card.Title
                title={item.name}
                subtitle={`GHS ${item.price}`}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    source={{ uri: `https://avatar.iran.liara.run/username?username=${item.name}` }} />
                )}
                right={props => user?.role === 'owner' && (
                  <IconButton
                    icon="update"
                    mode="contained"
                    onPress={() => {
                      navigation.dispatch(StackActions.push('EditProduct', { product: item }));
                    }}
                  />
                )} />
            </Card>
          )}
          keyExtractor={item => item.id} />
      </Surface>
      {user?.role === 'owner' && <FAB
        icon="plus-thick"
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onPress={() => {
          navigation.dispatch(StackActions.push('AddProduct'));
        }} />}
    </>
  );
}
