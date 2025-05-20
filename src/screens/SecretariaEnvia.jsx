// 3. src/screens/SecretariaEnvia.jsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../api/firebase';
import { sendPushNotification } from '../services/sendNotification';

export default function SecretariaEnvia() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, 'usuarios'));
      const tks = snap.docs
        .map(d => d.data().role === 'padre' && d.data().expoToken)
        .filter(Boolean);
      setTokens(tks);
    })();
  }, []);

  const handleSend = async () => {
    if (!title || !body) return Alert.alert('Error', 'Completa título y mensaje.');
    try {
      // Enviar push
      await sendPushNotification(tokens, title, body);
      // Registrar en Firestore
      await addDoc(collection(db, 'notificaciones'), {
        toRole: 'padre',
        title,
        body,
        timestamp: serverTimestamp(),
      });
      Alert.alert('Éxito', 'Notificación enviada.');
      setTitle(''); setBody('');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Mensaje" value={body} onChangeText={setBody} style={[styles.input, {height:80}]} multiline />
      <Button title="Enviar" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  input: { borderWidth:1, borderColor:'#ccc', borderRadius:4, marginBottom:12, padding:8 }
});
