import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView } from 'react-native-safe-area-context'
import Board from './src/components/Board'
import Home from './src/views/Home'
import LeaderBoards from './src/views/LeaderBoards'


const Tab = createBottomTabNavigator();

export default function App() {
  // console.log(board, 'ini di lala');
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home-outline' : 'home-outline';
              } else if (route.name === 'LeaderBoards') {
                iconName = focused ? 'trophy-outline' : 'trophy-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="LeaderBoards" component={LeaderBoards} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
