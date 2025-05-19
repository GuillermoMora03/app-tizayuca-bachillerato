// src/navigation/index.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* aquí meterás más pantallas protegidas */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* y pantalla de registro cuando tu compañero la termine */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}