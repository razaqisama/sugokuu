import React from 'react';
import {Text, View, StyleSheet, Dimensions, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
export default function Home() {
  const navigation = useNavigation();

  function handleSelect(difficulty) {
    navigation.navigate('Game', {
      difficulty
    })
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',width: windowWidth}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textShadowColor: 'red', textShadowRadius: 5}}>
          Play Subopu!
        </Text>
      </View>
      <View style={{flex: 4, justifyContent: 'space-evenly', width: windowWidth}}>
        <View style={{borderRadius: 20, borderColor: 'green', borderWidth: 2, marginLeft: '20%', marginRight: '20%', backgroundColor: "#fff"}}>
          <Button
            title="Easy"
            color="#EE7674"
            onPress={() => handleSelect('easy')}
          />
        </View>
        <View style={{borderRadius: 20, borderColor: 'blue', borderWidth: 2, marginLeft: '20%', marginRight: '20%', backgroundColor: "#fff"}}>
          <Button
            title="Medium"
            color="#EE7674"
            onPress={() => handleSelect('medium')}
          />
        </View>
        <View style={{borderRadius: 20, borderColor: 'red', borderWidth: 2, marginLeft: '20%', marginRight: '20%', backgroundColor: "#fff"}}>
          <Button
            title="Hard"
            color="#EE7674"
            onPress={() => handleSelect('hard')}
          />
        </View>
      </View>
      <View style={{flex: 1}}>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});