import React from 'react';
import {Text, View, StyleSheet, Dimensions, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Difficulty from '../components/Difficulty'
import Board from '../components/Board'
import Finish from '../components/Finish'
const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Difficulty} />
      <Stack.Screen name="Game" component={Board} />
      <Stack.Screen name="Finish" component={Finish} />
  </Stack.Navigator>
  );
}

