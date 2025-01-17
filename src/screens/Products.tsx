import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Card, FAB, Icon, IconButton, MD2Colors, Searchbar, Surface } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION } from '../core/constants';
import { useDebounce } from 'use-debounce';
import { Product } from '../core/types';
import { useUser } from '../hooks/user';
import { StackActions, useNavigation } from '@react-navigation/native';
import { differenceInDays } from 'date-fns';

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
      .orderBy('name', 'asc')
      .onSnapshot(documentSnapshot => {
        const products = documentSnapshot.docs.map(doc => {
          const { name, expiry, price, altPrice } = doc.data();
          return { id: doc.id, name, expiry, price, altPrice };
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
                  <Icon
                    {...props}
                    color={differenceInDays(new Date(item.expiry), new Date()) <= 90 ?
                      MD2Colors.redA700 : MD2Colors.greenA700}
                    source="package-variant" />
                )}
                right={props => user?.role === 'owner' && (
                  <IconButton
                    {...props}
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
