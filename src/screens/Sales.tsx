import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Dialog, FAB, IconButton, MD2Colors, Portal, Surface, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { SALES_COLLECTION } from '../core/constants';
import { Sale } from '../core/types';
import { endOfDay, startOfDay } from 'date-fns';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useUser } from '../hooks/user';
import DatePicker from 'react-native-date-picker';
import { groupBy } from 'lodash';
import { ProductName } from '../components';


export function SalesScreen() {
  const navigation = useNavigation();
  const { user } = useUser();
  const [sales, setSales] = useState<Sale[]>([]);
  const [saleToDelete, setSaleToDelete] = useState<Sale | null>(null);
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const deleteSale = () => {
    // console.log('Submitting product!');
    firestore()
      .collection(SALES_COLLECTION)
      .doc(saleToDelete?.id)
      .delete()
      .then(() => {
        setSaleToDelete(null);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection(SALES_COLLECTION)
      .where('createdAt', '>=', startOfDay(date).valueOf())
      .where('createdAt', '<=', endOfDay(date).valueOf())
      .onSnapshot(documentSnapshot => {
        const sales = documentSnapshot.docs.map(doc => {
          const { productId, price, quantity, createdAt } = doc.data();
          return { id: doc.id, productId, price, quantity, createdAt };
        });
        setSales(sales);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [date]);

  return (
    <>
      <Surface
        style={{ minHeight: '100%' }}
        elevation={0}>
        <Surface elevation={0} style={{ padding: 10 }}>
          <Button
            onPress={() => setIsDatePickerOpen(true)}
            uppercase={false}
            mode="outlined">{date.toDateString()}</Button>
          <DatePicker
            modal
            mode="date"
            open={isDatePickerOpen}
            date={date}
            onConfirm={(date) => {
              setIsDatePickerOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setIsDatePickerOpen(false);
            }}
          />
          <Card style={{ marginVertical: 10 }}>
            <Card.Content style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text>Total Sales:</Text>
              <Text
                style={{ fontWeight: 'bold' }}
              >GHS {sales.reduce((prev, next) => prev + parseInt(next.quantity) * parseFloat(next.price), 0).toLocaleString()}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => {
                // Compute Summary
                const groupedSales = groupBy(sales, sale => sale.productId);
                const salesSummary = [];
                for (const productId in groupedSales) {
                  const totalQuantity = groupedSales[productId].reduce((prev, next) => prev + parseInt(next.quantity), 0);
                  const totalAmount = groupedSales[productId].reduce((prev, next) => prev + (parseInt(next.quantity) * parseInt(next.price)), 0);
                  salesSummary.push({ productId, totalQuantity, totalAmount });
                }
                navigation.dispatch(StackActions.push('SalesSummary', { salesSummary }));
              }}>View Summary</Button>
            </Card.Actions>
          </Card>
        </Surface>
        <FlatList
          data={sales}
          style={{ flexGrow: 1, flex: 1, marginBottom: 60 }}
          renderItem={({ item }) => (
            <Card style={{ margin: 10 }}>
              <Card.Title
                title={<ProductName id={item.productId} />}
                subtitle={(
                  <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={{ fontWeight: 'bold' }}>{item.quantity}</Text>
                      <Text> sold @ </Text>
                      <Text style={{ fontWeight: 'bold' }}>GHS {item.price}</Text>
                      <Text> = </Text>
                      <Text style={{ fontWeight: 'bold' }}>GHS {(parseFloat(item.price) * parseInt(item.quantity)).toLocaleString()}</Text>
                    </View>
                    <Text selectable style={{ marginVertical: 10 }}>{item.id}</Text>
                  </View>
                )}
                right={props => ((item.createdAt > startOfDay(new Date()).valueOf()) && (user?.role === 'attendant')) && (
                  <IconButton
                    {...props}
                    icon="delete"
                    mode="contained"
                    iconColor={MD2Colors.redA700}
                    onPress={() => {
                      setSaleToDelete(item);
                    }}
                  />
                )} />
            </Card>
          )}
          keyExtractor={item => item.id} />
      </Surface>
      <Portal>
        <Dialog visible={!!saleToDelete} dismissable={false}>
          <Dialog.Title>Confirm!</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Are you sure you want to delete sale?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setSaleToDelete(null)}>No</Button>
            <Button onPress={deleteSale}>Yes</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      {user?.role === 'attendant' && <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 10, right: 10 }}
        onPress={() => {
          navigation.dispatch(StackActions.push('AddSale'));
        }} />}
    </>
  );
}
