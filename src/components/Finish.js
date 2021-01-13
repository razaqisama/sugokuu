import React, {useState} from 'react';
import { Text, Button, TextInput, View, Dimensions } from 'react-native';
import {setLeaderBoard} from '../store/actions'
import randomColor from 'randomcolor'
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function Finish({route}) {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const [result, setResult] = useState({
    name: null,
    solved: route.params.solved,
    solvingTime: route.params.time
  })

  console.log(result);
  function handleChange(text) {
    setResult({...result, name: text})
  }

  function submitLeaderBoard() {
    dispatch(setLeaderBoard(result));
    navigation.navigate('Home');
    navigation.navigate('LeaderBoards')
  }
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, alignItems: 'center', borderRadius: 50, marginTop: '10%', justifyContent: 'center', backgroundColor: randomColor()}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textShadowColor: 'red', textShadowRadius: 5}}>
          You Solved The Game!
        </Text>
      </View> 
      <View style={{flex: 8, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', width: windowWidth}}>
          <TextInput 
            style={{borderBottomWidth: 1}}
            onChangeText={text => handleChange(text)}
            value={result.name}
            placeholder='Enter Your Name'
          >
          </TextInput>
        </View>
        <View style={{flex: 1, padding:'20%', width: windowWidth}}>
          <View style={{flex: 1, borderRadius: 20, borderWidth: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
            <Button
              title="Submit To LeaderBoard"
              color="#EE7674"
              onPress={() => submitLeaderBoard()}
            />
          </View>
        </View>
      </View> 
    </View>
  );
}