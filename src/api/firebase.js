// src/api/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore }  from 'firebase/firestore';

// ✨ Trae estas dos APIs desde el sub-módulo “react-native”
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAXS8kdEaG4IbjMZdQgffdV2S3RMAo8KzE",
  authDomain: "noticiasesti.firebaseapp.com",
  projectId: "noticiasesti",
  storageBucket: "noticiasesti.appspot.com",
  messagingSenderId: "436501289104",
  appId: "1:436501289104:web:f20b0047e307537586e015",
};

const app = initializeApp(firebaseConfig);

// 🚨 Aquí creas tu instancia de Auth para RN, especificando AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Firestore queda igual
export const db = getFirestore(app);