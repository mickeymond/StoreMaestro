import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { User } from '../core/types';
import { USERS_COLLECTION } from '../core/constants';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    // console.log(user);
    if (user) {
      // console.log(user.uid);
      firestore()
        .collection(USERS_COLLECTION)
        .where('userId', '==', user.uid)
        .get()
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            const { userId, name, email, role } = querySnapshot.docs[0].data();
            setUser({ id: querySnapshot.docs[0].id, userId, name, email, role });
          }
        });
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return { user };
}
