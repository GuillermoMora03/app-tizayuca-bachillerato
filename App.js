// App.js
import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './src/navigation';
import { AuthProvider, AuthContext } from './src/context/AuthContext';

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