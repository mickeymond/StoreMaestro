import React from 'react';
import { Button, Card, Surface, Text } from 'react-native-paper';
import { AppStackParamList } from '../core/types';
import { ScrollView, View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductName } from '../components';

interface SalesSummaryProps extends NativeStackScreenProps<AppStackParamList, 'SalesSummary'> { }

export function SalesSummary({ route }: SalesSummaryProps) {
  const { salesSummary } = route.params;
  const navigation = useNavigation();

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      elevation={0}>
      <Text
        style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30, marginVertical: 15 }}>
        Sales Summary
      </Text>
      <ScrollView style={{ maxHeight: '80%' }}>
        {salesSummary.map(({ productId, totalQuantity, totalAmount }) => (
          <Card
            style={{ marginVertical: 10 }}
            key={productId}>
            <Card.Title
              title={<ProductName id={productId} />} />
            <Card.Content>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Total Quantity: </Text>
                <Text style={{ fontWeight: 'bold' }}>{totalQuantity} SKUs</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Total Amount: </Text>
                <Text style={{ fontWeight: 'bold' }}>GHS {totalAmount.toLocaleString()}</Text>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Button
        style={{ marginVertical: 10 }}
        mode="contained"
        onPress={() => {
          navigation.dispatch(StackActions.pop());
        }}>Back to Sales</Button>
    </Surface>
  );
}
