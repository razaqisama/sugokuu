import React from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions, Button } from 'react-native';
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import randomColor from 'randomcolor'

export default function Board({route}) {
  const navigation = useNavigation();
  const {difficulty} = route.params;
  const [board, setBoard] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [gameStatus, setGameStatus] = useState(true);
  const [timer, setTimer] = useState('');
  const [paused, setPaused] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [win, setWin] = useState(false);
  useEffect(()=>{
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
    .then(response => response.json())
    .then(data => {
      setBoard(data.board);
      const toSolve = data;
      const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
      const encodeParams = (params) => 
        Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

      start()
      fetch('https://sugoku.herokuapp.com/solve', {
        method: 'POST',
        body: encodeParams(toSolve),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
        .then(response => response.json())
        .then(response => setSolvedBoard(response.solution))
        .catch(console.warn)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  function handleChange (text, index) {
    let clone = [...board]
    if(Number(text) === solvedBoard[index[0]][index[1]]){
      clone[index[0]][index[1]] = Number(text);
    } else {
      setMistakes(mistakes + 1);
      clone[index[0]][index[1]] = 0;
    }
    
    if(mistakes > 3) {
      handleGiveUp()
    } else {
      setBoard(clone)
    }
  }
  function renderCell (col, index, idx) {
    if(col > 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{col}</Text>
        </View>
      )
    } else {
      return (
        <TextInput 
          style={{ flex: 1}}
          onChangeText={text => handleChange(text, [index, idx])}
          value={''}
        >
        </TextInput>
      )
    }
  }

  function renderColorCell (index, idx) {
    if(index < 3) {
      if(idx < 3) {
        return '#E07BE0'
      } else if (idx < 6) {
        return '#DCCCFF'
      } else {
        return '#F6F2FF'
      }
    } else if (index < 6) {
      if(idx < 3) {
        return '#F6F2FF'
      } else if (idx < 6) {
        return '#E07BE0'
      } else {
        return '#DCCCFF'
      }
    } else {
      if(idx < 3) {
        return '#DCCCFF'
      } else if (idx < 6) {
        return '#F6F2FF'
      } else {
        return '#E07BE0'
      }
    }
  }

  function renderButton () {
    if(gameStatus) {
      return (
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection:'row', backgroundColor: "#B8DBD9"}}>
          <View style={{flex: 2, borderRadius: 10, marginLeft: 5, marginRight: 10, backgroundColor: "#fff"}}>
            <Button
              title="Check Answer"
              color="#EE7674"
              onPress={() => handleCheck()}
            />
          </View>
        </View>
      )
    } else {
      if(win) {
        return (
          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection:'row', backgroundColor: "#B8DBD9"}}>
            <View style={{flex: 1, borderRadius: 10, marginLeft: 10, marginRight: 10, backgroundColor: "#fff"}}>
              <Button
                title={"Yuuuhuuu!!"}
                color="#EE7674"
                onPress={() => solve()}
              />
            </View>
          </View>
        )
      } else {
        return (
          <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', flexDirection:'row', backgroundColor: "#B8DBD9"}}>
            <View style={{flex: 1, borderRadius: 10, marginLeft: 10, marginRight: 10, backgroundColor: "#fff"}}>
              <Button
                title={"Relax, you are doing fine"}
                color="#EE7674"
                onPress={() => handleGiveUp()}
              />
            </View>
          </View>
        )
      }
    }
  }

  function handleCheck () {
    pause()
    let solved = true;
    for(let i = 0; i < board.length; i++){
      for(let j = 0; j < board.length; j++){
        if(board[i][j] === 0){
          solved = false;
          break;
        }
      }
    }
    if(solved) {
      setGameStatus(!gameStatus);
      setWin(true);
    } else {
      handleGiveUp();
    }
  }
  function solve() {
    navigation.navigate('Finish', {
      solved: true,
      time: paused
    })
  }
  function handleGiveUp () {
    if(gameStatus) {
      setGameStatus(!gameStatus);
      setBoard(solvedBoard);
    } else {
      navigation.navigate('Home')
    }
  }

  function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
  
    return `${formattedMM}:${formattedSS}`;
  }

  let startTime;
  let elapsedTime = 0;
  let timerInterval;
  
  function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      setTimer(timeToString(elapsedTime))
    }, 1000);
  }

  function pause() {
    clearInterval(timerInterval);
    setPaused(timer);
  }

  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection: 'row', backgroundColor: "#B8DBD9"}}>
        <Text style={{flex: 1}}>{difficulty}</Text>
        <Text style={{flex: 1}}>{paused ? paused : timer}</Text>
        <Text style={{flex: 1}}>Mistakes: {mistakes} / 5 </Text>
      </View>
      {
        board.map((row, index)=> {
          return (
            <View key={index} style={{flex: 2, flexDirection: 'row', borderWidth: 1}}>
              {
                row.map((col, idx) => {
                  const colorKotak = renderColorCell(index, idx);
                  return (
                    <View key={idx} style={{flex: 1, borderWidth: 1, backgroundColor: colorKotak}}>
                        {
                          renderCell(col, index, idx)
                        }
                    </View>
                    )
                })
              }
            </View>
          )
        })
      }
      {board.length ? renderButton(gameStatus) : <Text></Text>}
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth
  }
});