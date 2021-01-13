import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  unSolvedBoard: [],
  solvedBoard: []
}

function reducer (state = initialState, action) {
  switch(action.type) {
    case "SET_UNSOLVEDBOARD": 
      return {...initialState, unSolvedBoard: action.payload}
    case "SET_SOLVEDBOARD":
      return {...initialState, solvedBoard: action.payload}
    default: 
      return state
  }
}