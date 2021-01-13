import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import randomColor from 'randomcolor'

export default function LeaderBoards({col}) {
  
  return (
    <View>
      <Text>Ini LeaderBoards</Text>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  col: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});