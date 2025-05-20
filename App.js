// App.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './src/navigation';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
// 4. Modificar App.js para listeners
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { registerForPushNotifications } from './src/services/notifications';
import * as Notifications from 'expo-notifications';

function Root() {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <AppNavigator isLoggedIn={!!user} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

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
