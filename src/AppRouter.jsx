import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GameContext } from './context/GameContextProvider';
import Welcome from './views/Welcome';
import WordChoosing from './views/WordChoosing';
import Drawing from './views/Drawing';
import Waiting from './views/Wating';
import Guess from './views/Guess';
import { useContext } from 'react';

const AppRouter = () => {
  const { state } = useContext(GameContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        {state.user.id && (
          <>
            <Route path="/word-choosing" element={<WordChoosing />} />
            <Route path="/drawing" element={<Drawing />} />
            <Route path="/waiting" element={<Waiting />} />
            <Route path="/guess" element={<Guess />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
