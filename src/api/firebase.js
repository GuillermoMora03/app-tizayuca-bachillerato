// src/api/firebase.js

// Importa la inicialización base de Firebase
import { initializeApp } from 'firebase/app';
// Importa Firestore
import { getFirestore } from 'firebase/firestore';
// Importa la capa de Auth para React Native y AsyncStorage para persistencia
import {
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ——————————————————————————————————————————————
// Reemplaza estos valores con los de tu proyecto Firebase:
// ——————————————————————————————————————————————
const firebaseConfig = {
    apiKey: "AIzaSyAXS8kdEaG4IbjMZdQgffdV2S3RMAo8KzE",
    authDomain: "noticiasesti.firebaseapp.com",
    projectId: "noticiasesti",
    storageBucket: "noticiasesti.firebasestorage.app",
    messagingSenderId: "436501289104",
    appId: "1:436501289104:web:f20b0047e307537586e015",
    measurementId: "G-73B2M74W51"
  };

// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth **específico para React Native**, usando AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Inicializa Firestore
export const db = getFirestore(app);