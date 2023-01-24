import { useContext } from 'react';
import View from '../components/View';
import { GameContext } from '../context/GameContextProvider';

const Waiting = () => {
  const { state } = useContext(GameContext);

  return (
    <View>
      <div className="waiting">
        <h2>
          Let's wait for player {state.opponent.playerNumber} to guess our
          drawing
        </h2>
      </div>
    </View>
  );
};

export default Waiting;
