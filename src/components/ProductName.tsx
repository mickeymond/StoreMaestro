import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { PRODUCTS_COLLECTION } from '../core/constants';
import firestore from '@react-native-firebase/firestore';

export function ProductName({ id }: { id: string }) {
  const [name, setName] = useState('Loading...');

  useEffect(() => {
    firestore()
      .collection(PRODUCTS_COLLECTION)
      .doc(id)
      .get()
      .then(snapshot => {
        setName(`${snapshot.data()?.name} @ GHS ${snapshot.data()?.price}`);
      });
  }, [id]);

  return <Text>{name}</Text>;
}
