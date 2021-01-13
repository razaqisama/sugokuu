import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board: [],
  solvedBoard: [],
  leaderBoard: []
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case "SET_BOARD": 
      return {...state, unSolvedBoard: action.payload}
    case "SET_SOLVEDBOARD":
      return {...state, solvedBoard: action.payload}
    case "SET_LEADERBOARD":
      return {...state, leaderBoard: action.payload}
    default: 
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store