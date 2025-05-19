// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
// Importa el handler de auth desde el sub-módulo react-native
import { onAuthStateChanged } from 'firebase/auth/react-native';
import { auth } from '../api/firebase';

export const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscríbete a cambios de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    // Limpia la suscripción al desmontar
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
