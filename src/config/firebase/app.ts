import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBHRFEwiTBBmH0TgS9Ni42ksKGElVyKEOw",
  authDomain: "supremoapp-e58bf.firebaseapp.com",
  projectId: "supremoapp-e58bf",
  storageBucket: "supremoapp-e58bf.appspot.com",
  messagingSenderId: "1023765458539",
  appId: "1:1023765458539:web:d8f131a142121588230b2e",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
