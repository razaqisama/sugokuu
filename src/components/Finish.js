import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import randomColor from 'randomcolor'

export default function Finish() {
  
  return (
    <View>
      <Text>Ini Finish</Text>
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