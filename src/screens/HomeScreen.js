// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { auth } from '../api/firebase';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  // Función para cerrar sesión
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar sesión. Intenta de nuevo.');
    }
  };

  // Función para programar notificación local
  const handleLocalNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: '🔔 Notificación de prueba',
          body: '¡Esta es una notificación local programada!',
        },
        trigger: { seconds: 5 },
      });
      Alert.alert('Notificación', 'Se programó una notificación en 5 segundos.');
    } catch (error) {
      console.error('Error al programar notificación:', error);
      Alert.alert('Error', 'No se pudo programar la notificación.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Inicio</Text>
      <Text>Aquí irá tu contenido principal.</Text>
      <View style={styles.buttonContainer}>
        <Button title="Cerrar sesión" onPress={handleSignOut} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Probar notificación local"
          onPress={handleLocalNotification}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
});