import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import {useSelector} from 'react-redux';
import randomColor from 'randomcolor'

export default function LeaderBoards() {
  const leaderBoard = useSelector(state => state.leaderBoard)
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold', textShadowColor: 'red', textShadowRadius: 5}}>
          LeaderBoard
        </Text>
      </View>
      <View style={{flex: 10, padding: 10}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderTopStartRadius: 10, borderBottomWidth: 0, backgroundColor: '#DCABDF'}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>#</Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text>Name</Text>
          </View>
          <View style={{flex: 2, alignItems: 'center'}}>
            <Text>Solving Time</Text>
          </View>
        </View>
        <View style={{flex: 8, borderWidth: 1, borderBottom: 0, borderBottomEndRadius: 10}}>
          {
            leaderBoard.map((player, index) => {
              return (
                <View key={index} style={{flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomEndRadius: (index + 1 === leaderBoard.length) ? 10 : 0, backgroundColor: index % 2 ? '#DCABDF' : '#C792DF'}}>
                  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{index + 1}</Text>
                  </View>
                  <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{player.name}</Text>
                  </View>
                  <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>{player.solvingTime}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </View>
  );
}