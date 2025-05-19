// src/screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';          // ← Ajusta ruta si tu firebase.js está en otra carpeta
import { AuthContext } from '../context/AuthContext'; // ← Ajusta ruta si tu AuthContext.js está en otra carpeta

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading } = useContext(AuthContext);

  const handleLogin = () => {
    if (!email.trim() || !password) {
      return Alert.alert(
        'Datos incompletos',
        'Por favor ingresa correo y contraseña'
      );
    }
    signInWithEmailAndPassword(auth, email.trim(), password)
      .catch(err =>
        Alert.alert('Error al iniciar sesión', err.message)
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla de Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={loading ? 'Cargando...' : 'Ingresar'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 16
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 12
  }
});