export const initialState = {
  user: { id: null, playerNumber: null },
  opponent: { id: null, playerNumber: null },
  word: null,
  paths: null,
  score: { points: 0, seconds: 0 },
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { id: action.id, playerNumber: action.playerNumber },
      };
    case 'SET_OPPONENT':
      return {
        ...state,
        opponent: { id: action.id, playerNumber: action.playerNumber },
      };
    case 'SET_WORD':
      return { ...state, word: action.word };
    case 'SET_PATHS':
      return { ...state, paths: action.paths };
    case 'SET_SCORE':
      return {
        ...state,
        score: { points: action.points, seconds: action.seconds },
      };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
