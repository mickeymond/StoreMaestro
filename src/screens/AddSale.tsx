import React, { useEffect, useState } from 'react';
import { Button, Divider, RadioButton, Surface, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION, SALES_COLLECTION } from '../core/constants';
import { Product } from '../core/types';
import { View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Controller, FieldValues, useForm } from 'react-hook-form';

export function AddSale() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [prices, setPrices] = useState<string[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: { productId: '', price: '', quantity: '' },
  });

  const submit = ({ productId, price, quantity }: FieldValues) => {
    setLoading(true);
    firestore()
      .collection(SALES_COLLECTION)
      .add({ productId, price, quantity, createdAt: Date.now(), updatedAt: Date.now() })
      .then(() => {
        // console.log('Sale added!');
        navigation.dispatch(StackActions.pop());
      })
      .catch(error => {
        console.log(error);
        // Disable loader
        setLoading(false);
      });
  };

  useEffect(() => {
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .orderBy('name', 'asc')
      .get()
      .then(snapshot => {
        const products = snapshot.docs.map(doc => {
          const { name, expiry, price, altPrice } = doc.data();
          return { id: doc.id, name, expiry, price, altPrice };
        });
        setProducts(products);
        if (!snapshot.empty) {
          const { id, price, altPrice } = products[0];
          setValue('productId', id);
          setValue('price', price);
          setPrices([...new Set([price, altPrice || price])]);
        }
      });
  }, [setValue]);

  return (
    <Surface
      style={{ minHeight: '100%', margin: 10, display: 'flex', flexDirection: 'column', flexGrow: 1 }}
      elevation={0}>
      <Text
        style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 18, marginTop: 30, marginVertical: 15 }}>
        Add New Sale
      </Text>
      <View style={{ marginVertical: 15 }}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              selectedValue={value}
              onBlur={onBlur}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                const product = products.find(({ id }) => id === itemValue);
                if (product) {
                  const { price, altPrice } = product;
                  setValue('price', price);
                  setPrices([...new Set([price, altPrice || price])]);
                } else {
                  setValue('price', '');
                  setPrices([]);
                }
              }}>
              {products.map(({ name, id, price }) => {
                return <Picker.Item key={id} label={`${name} @ GHS ${price}`} value={id} />;
              })}
            </Picker>
          )}
          name="productId"
        />
        {errors.productId && <Text>This is required.</Text>}
      </View>
      <Divider />
      <View style={{ marginVertical: 15 }}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <RadioButton.Group
              onValueChange={onChange}
              value={value}>
              {prices.map((price, i) => (
                <RadioButton.Item
                  key={i}
                  label={`${i == 1 ? 'Alternate Price' : 'Normal Price'} (GHS ${price})`}
                  value={price} />
              ))}
            </RadioButton.Group>
          )}
          name="price"
        />
        {errors.price && <Text>Sale price is required.</Text>}
      </View>
      <Divider />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Sale Quantity"
            mode="outlined"
            inputMode="numeric"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="quantity"
      />
      {errors.quantity && <Text>Sale quantity is required.</Text>}
      <View
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 15 }}>
        <Button
          style={{ width: '45%' }}
          buttonColor="red" mode="contained"
          disabled={loading}
          onPress={() => {
            navigation.dispatch(StackActions.pop());
          }}>Cancel</Button>
        <Button
          style={{ width: '45%' }}
          loading={loading}
          mode="contained" onPress={handleSubmit(submit)}
          disabled={!isValid}>Submit</Button>
      </View>
    </Surface>
  );
}
