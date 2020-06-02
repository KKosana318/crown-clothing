import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAv931Usfmt1OWVs8fp7340tqwiZYvi4qY",
  authDomain: "crown-db-3e05f.firebaseapp.com",
  databaseURL: "https://crown-db-3e05f.firebaseio.com",
  projectId: "crown-db-3e05f",
  storageBucket: "crown-db-3e05f.appspot.com",
  messagingSenderId: "425683419015",
  appId: "1:425683419015:web:e19439d89459108bfcdd22",
  measurementId: "G-W050NQ5THT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({ displayName, email, createdAt, ...additionalData })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;