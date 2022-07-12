import React, {useEffect, useState} from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMediaQuery } from 'native-base';
import HomeScreen from './HomeScreen';
import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Splashscreen" >
      <Stack.Screen name="Splashscreen" component={SplashScreen}  options={{headerShown: false}} />
      <Stack.Screen name="Home" component={HomeScreen}  options={{headerShown: false}} />
      <Stack.Screen name="Auth" component={LoginScreen}  options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
      <MyStack />
  );
}