import React, { createContext, useReducer } from 'react';
import gameReducer, { initialState } from '../reducers/gameReducer.js';

export const GameContext = createContext();

const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
