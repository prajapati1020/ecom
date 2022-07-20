import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAynjVwlrhbXcfQQbJsEev0yneusinxrcc",
    authDomain: "ecommerce-753d5.firebaseapp.com",
    projectId: "ecommerce-753d5",
    storageBucket: "ecommerce-753d5.appspot.com",
    messagingSenderId: "967835748397",
    appId: "1:967835748397:web:23ea7bdbb70fc774ce10a4",
    measurementId: "G-R835C6W9GN"
  };
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export const auth = getAuth(app);
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const signOutUser = () => signOut(auth);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  return userDocRef;
};
