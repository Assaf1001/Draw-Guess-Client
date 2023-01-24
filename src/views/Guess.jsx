import { useEffect, useState } from 'react';
import { createRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  resetStateAction,
  setPathsAction,
  setScoreAction,
  setWordAction,
} from '../actions/gameActions';
import DrawingCanvas from '../components/DrawCanvas';
import Score from '../components/Score';
import View from '../components/View';
import { GameContext } from '../context/GameContextProvider';
import { saveNewScore } from '../server/api';

const Guess = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GameContext);
  const canvasRef = createRef();

  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState({ content: '', isError: false });
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [seconds, setSeconds] = useState(state.score.seconds);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!running) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const onChangeInput = (e) => {
    setGuess(e.target.value.trim().toLowerCase());
    setMessage({ content: '', isError: false });
  };

  const onClickGuess = () => {
    if (guess === state.word) {
      setRunning(false);
      setIsCorrectAnswer(true);

      let points = 0;
      switch (state.word.length) {
        case 3:
        case 4:
          points = 1;
          break;
        case 5:
          points = 3;
          break;
        default:
          points = 5;
          break;
      }

      setMessage({
        content: `Correct! You gain ${points} point${points === 1 ? '' : 's'}`,
        isError: false,
      });
      dispatch(setScoreAction(state.score.points + points, seconds));
    } else {
      setMessage({ content: 'Wrong answer! Please try again.', isError: true });
    }
  };

  const onClickContinue = () => {
    dispatch(setPathsAction(null));
    dispatch(setWordAction(null));
    navigate('/word-choosing');
  };

  const onClickEndGame = async () => {
    await saveNewScore(state.score);
    dispatch(resetStateAction());
    navigate('/welcome');
  };

  return (
    <View>
      <div className="drawing">
        <Score points={state.score.points} seconds={seconds} />
        <h2>Guess the word:</h2>
        <DrawingCanvas paths={state.paths} canvasRef={canvasRef} />
        {message.content !== '' && (
          <p className={message.isError ? 'message error' : 'message'}>
            {message.content}
          </p>
        )}
        {!isCorrectAnswer ? (
          <>
            <input
              type="text"
              value={guess}
              placeholder={'Place your guess here'}
              onChange={onChangeInput}
            />
            <div onClick={onClickGuess} className="word-box">
              <p>Guess</p>
            </div>
          </>
        ) : (
          <div className="button-wrapper">
            <button onClick={onClickContinue} className="word-box">
              Continue
            </button>
            <button onClick={onClickEndGame} className="word-box">
              End game
            </button>
          </div>
        )}
      </div>
    </View>
  );
};

export default Guess;
