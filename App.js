// App.js
import React, { useContext, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { registerForPushNotifications } from './src/services/notifications';
import * as Notifications from 'expo-notifications';

// Configuración global de handler para notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
  }),
});

// Componente que renderiza la navegación según estado de autenticación
function Root() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <AppNavigator isLoggedIn={!!user} />;
}

// Componente principal de la aplicación
export default function App() {
  const notifListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Registrar permisos y obtener token
    registerForPushNotifications();

    // Listeners de notificaciones
    notifListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notificación recibida:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
    });

    return () => {
      notifListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
