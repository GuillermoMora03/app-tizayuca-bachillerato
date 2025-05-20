// 1. src/services/notifications.js
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';
import { auth, db } from '../api/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Solicita permisos, registra el token Expo y lo guarda en Firestore
 */
export async function registerForPushNotifications() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Permiso denegado', 'Debes habilitar notificaciones.');
    return null;
  }
  const tokenData = await Notifications.getExpoPushTokenAsync();
  const expoToken = tokenData.data;
  const user = auth.currentUser;
  if (user) {
    await setDoc(doc(db, 'usuarios', user.uid), { expoToken }, { merge: true });
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
  return expoToken;
}
