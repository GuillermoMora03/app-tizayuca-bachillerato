// 4. Modificar App.js para listeners
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { registerForPushNotifications } from './src/services/notifications';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowAlert: true, shouldPlaySound: true }),
});

export default function App() {
  const notifListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotifications();
    notifListener.current = Notifications.addNotificationReceivedListener(n => console.log('Received:', n));
    responseListener.current = Notifications.addNotificationResponseReceivedListener(r => console.log('Response:', r));
    return () => {
      notifListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return <View style={styles.container} />;
}
const styles = StyleSheet.create({ container: { flex:1 } });