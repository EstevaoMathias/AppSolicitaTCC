import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import NovoUsuario from './Pages/Registro/NovoUsuario';
import TelaOrientadores from './Pages/TelaOrientadores/TelaOrientadores';
import TelaTCC from './Pages/TelaTCC/TelaTCC';
import CadastroSolicitacao from './Pages/CadastroSolicitacao/CadastroSolicitacao';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="TelaOrientadores" component={TelaOrientadores} />
        <Stack.Screen name="TelaTCC" component={TelaTCC} />
        <Stack.Screen name="NovoUsuario" component={NovoUsuario} />
        <Stack.Screen name="CadastroSolicitacao" component={CadastroSolicitacao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
