import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, FAB, Modal, Portal, Surface, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AddProduct, EditProduct } from '../components';
import { PRODUCTS_COLLECTION, SALES_COLLECTION } from '../core/constants';
import { Product, Sale } from '../core/types';
import { DatePickerModal } from 'react-native-paper-dates';


export function SalesScreen() {
  const [products, setProducts] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Sale | null>(null);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setIsDatePickerOpen(false);
  }, [setIsDatePickerOpen]);

  const onConfirmSingle = useCallback(
    (params: any) => {
      setIsDatePickerOpen(false);
      setDate(params.date);
    },
    [setIsDatePickerOpen, setDate]
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection(SALES_COLLECTION)
      .onSnapshot(documentSnapshot => {
        const products = documentSnapshot.docs.map(doc => {
          return { id: doc.id, productId: doc.data().productId, price: doc.data().price, quantity: doc.data().quantity };
        });
        setProducts(products);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <Surface
      style={{ marginBottom: 300, minHeight: '100%' }}
      elevation={0}>
      <Surface elevation={0} style={{ padding: 10 }}>
        <Button
          onPress={() => setIsDatePickerOpen(true)}
          uppercase={false}
          mode="outlined">{date.toDateString()}</Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={isDatePickerOpen}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
        <Card style={{ marginVertical: 10 }}>
          <Card.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text>Total Sales:</Text>
            <Text style={{ fontWeight: 'bold' }}>GHS 28,000.00</Text>
          </Card.Content>
        </Card>
      </Surface>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title={item.productId}
              subtitle={`GHS ${item.price}`}
              right={(props) => (
                <Button
                  {...props}
                  onPress={() => {
                    setProductToEdit(item);
                    setIsModalOpen(true);
                  }}>Edit</Button>
              )}
            />
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
          <AddProduct
            dismissModal={() => setIsModalOpen(false)} />
          {/* {!productToEdit ?
            <AddProduct
              dismissModal={() => setIsModalOpen(false)} /> :
            <EditProduct
              product={productToEdit}
              dismissModal={() => {
                setIsModalOpen(false);
                setProductToEdit(null);
              }} />} */}
        </Modal>
      </Portal>
    </Surface>
  );
}
