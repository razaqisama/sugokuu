export function setBoard(payload) {
  return {
    type: 'SET_BOARD',
    payload
  }
}

export function setSolvedBoard(payload) {
  return {
    type: 'SET_SOLVEDBOARD',
    payload
  }
}

export function setLeaderBoard(payload) {
  return (dispatch, getState) => {
    let clone = {...getState(), leaderBoard: [...getState().leaderBoard, {
      name: payload.name,
      solved: payload.solved,
      solvingTime: payload.solvingTime
    }]}
    clone.leaderBoard.sort(function (a, b) {
      return new Date('1970/01/01 ' + a.solvingTime) - new Date('1970/01/01 ' + b.solvingTime);
    });
    dispatch({
      type: "SET_LEADERBOARD",
      payload: clone.leaderBoard
    })
  }
  // return {
  //   type: 'SET_LEADERBOARD',
  //   payload
  // }
}