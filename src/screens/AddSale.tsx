import React, { useEffect, useState } from 'react';
import { Button, Surface, Text, TextInput } from 'react-native-paper';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { PRODUCTS_COLLECTION, SALES_COLLECTION } from '../core/constants';
import { Product } from '../core/types';
import { View } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';

export function AddSale() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: { productId: '', price: '', quantity: '' },
  });

  const submit = (data: FirebaseFirestoreTypes.DocumentData) => {
    setLoading(true);
    firestore()
      .collection(SALES_COLLECTION)
      .add({ ...data, createdAt: Date.now(), updatedAt: Date.now() })
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
          return { id: doc.id, name: doc.data().name, price: doc.data().price };
        });
        setProducts(products);
        if (!snapshot.empty) {
          setValue('productId', products[0].id);
          setValue('price', products[0].price);
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
                setValue('price', products.find(({ id }) => id === itemValue)?.price || '0');
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
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Price"
            mode="outlined"
            inputMode="decimal"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="price"
      />
      {errors.price && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={{ marginVertical: 15 }}
            label="Quantity"
            mode="outlined"
            inputMode="numeric"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="quantity"
      />
      {errors.quantity && <Text>This is required.</Text>}
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
