export const setUserAction = (id, playerNumber) => ({
  type: 'SET_USER',
  id,
  playerNumber,
});

export const setOpponentAction = (id, playerNumber) => ({
  type: 'SET_OPPONENT',
  id,
  playerNumber,
});

export const setWordAction = (word) => ({
  type: 'SET_WORD',
  word,
});

export const setPathsAction = (paths) => ({
  type: 'SET_PATHS',
  paths,
});

export const setScoreAction = (points, seconds) => ({
  type: 'SET_SCORE',
  points,
  seconds,
});

export const resetStateAction = () => ({
  type: 'RESET_STATE',
});
