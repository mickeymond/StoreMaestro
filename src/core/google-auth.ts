import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { USERS_COLLECTION } from './constants';

export async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();
  // console.log(signInResult);

  // Try the new style of google-sign in result, from v13+ of that module
  const idToken = signInResult.data?.idToken;
  if (!idToken) {
    throw new Error('No ID token found');
  }

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const userCredential = await auth().signInWithCredential(googleCredential);

  // Check if user already exist
  const userQuerySnapshot = await firestore()
    .collection(USERS_COLLECTION)
    .where('userId', '==', userCredential.user.uid)
    .get();
  if (userQuerySnapshot.empty) {
    // Create user record for account
    await firestore()
      .collection(USERS_COLLECTION)
      .add({
        userId: userCredential.user.uid,
        name: `${signInResult.data?.user.givenName} ${signInResult.data?.user.familyName}`,
        email: signInResult.data?.user.email,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  }
}
