import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket/socket';
import View from '../components/View';
import { GameContext } from '../context/GameContextProvider';
import {
  resetStateAction,
  setOpponentAction,
  setPathsAction,
  setScoreAction,
  setUserAction,
  setWordAction,
} from '../actions/gameActions';
import Score from '../components/Score';
import { getBestScore } from '../server/api';

const Welcome = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(GameContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [bestSeconds, setBestSeconds] = useState(0);
  const [bestPoints, setBestPoints] = useState(0);

  const fetchScore = async () => {
    const res = await getBestScore();

    setBestPoints(res.points);
    setBestSeconds(res.seconds);
  };

  const socketListiners = () => {
    socket.connect();
    socket.on('getUsers', (users) => {
      if (!state.user.id) {
        dispatch(setUserAction(socket.id, users.player1 === socket.id ? 1 : 2));
      }
      dispatch(
        setOpponentAction(
          users.player2 !== socket.id ? users.player2 : users.player1,
          users.player1 !== socket.id ? 1 : 2
        )
      );
      setIsButtonDisabled(!users.player2);
    });

    socket.on('recieveGameData', ({ word, paths, score }) => {
      dispatch(setWordAction(word));
      dispatch(setPathsAction(paths));
      dispatch(setScoreAction(score.points, score.seconds));
      navigate('/guess');
    });

    // socket.on('userDisconnected', (opponentId) => {
    //   console.log(opponentId, state.opponent.id);
    //   // if (opponentId === state.opponent.id) {
    //   dispatch(resetStateAction());
    //   navigate('/welcome');
    //   // }
    // });

    socket.on('gameFull', () => {
      console.log('game-full');
      navigate('/game-full');
    });
  };

  useEffect(() => {
    fetchScore();
    socketListiners();
  }, []);

  return (
    <View>
      <div className="welcome">
        <div>
          <h1>Draw & Guess</h1>
          <h2>
            {state.user?.playerNumber === 1
              ? !state.opponent?.id
                ? 'Wating for player 2 to join the game'
                : 'Player 2 is here, press start to begin the game'
              : 'Wating for player 1 to start drawing'}
          </h2>
          <Score points={bestPoints} seconds={bestSeconds} isBestScore={true} />
        </div>
        {state.user?.playerNumber === 1 && (
          <button
            className={`word-box ${isButtonDisabled ? 'disabled' : 'dark'}`}
            disabled={isButtonDisabled}
            onClick={() => navigate('word-choosing')}
          >
            <p>Start</p>
          </button>
        )}
      </div>
    </View>
  );
};

export default Welcome;
