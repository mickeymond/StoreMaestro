import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Dialog, FAB, Modal, Portal, Surface, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { AddSale } from '../components';
import { SALES_COLLECTION } from '../core/constants';
import { Sale } from '../core/types';
import { DatePickerModal } from 'react-native-paper-dates';
import { endOfDay, startOfDay } from 'date-fns';


export function SalesScreen() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
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
      .where('createdAt', '>=', startOfDay(date))
      .where('createdAt', '<=', endOfDay(date))
      .onSnapshot(documentSnapshot => {
        const sales = documentSnapshot.docs.map(doc => {
          return { id: doc.id, productId: doc.data().productId, price: doc.data().price, quantity: doc.data().quantity };
        });
        setSales(sales);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [date]);

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
        data={sales}
        renderItem={({ item }) => (
          <Card style={{ margin: 10 }}>
            <Card.Title
              title={item.productId}
              subtitle={(
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text>
                  <Text> sold @ </Text>
                  <Text style={{ fontWeight: 'bold' }}>GHS {item.price}</Text>
                </View>
              )} />
            <Card.Actions>
              <Button
                mode="outlined"
                textColor="red"
                style={{ borderColor: 'red' }}
                onPress={() => {
                  setSaleToDelete(item);
                }}>Delete</Button>
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
        <Dialog visible={!!saleToDelete} dismissable={false}>
          <Dialog.Title>Confirm!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete sale?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSaleToDelete(null)}>No</Button>
            <Button onPress={() => setSaleToDelete(null)}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
        <Modal
          visible={isModalOpen}
          dismissable={false}
          contentContainerStyle={{ backgroundColor: 'white', marginHorizontal: 10, borderRadius: 10 }}>
          <AddSale
            dismissModal={() => setIsModalOpen(false)} />
        </Modal>
      </Portal>
    </Surface>
  );
}
