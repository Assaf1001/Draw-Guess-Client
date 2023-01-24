import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setWordAction } from '../actions/gameActions';
import View from '../components/View';
import { GameContext } from '../context/GameContextProvider';
import { generateWord } from '../utils/utils';

const WordChoosing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GameContext);
  const [words, setWords] = useState([
    generateWord('easy'),
    generateWord('medium'),
    generateWord('hard'),
  ]);

  const onSelectWord = (word) => {
    dispatch(setWordAction(word));
    navigate('/drawing');
  };

  return (
    <View>
      <div className="word-choosing">
        <div>
          <h2>Please choose a word to draw:</h2>
          <div className="words-container">
            <div onClick={() => onSelectWord(words[0])} className="word-box">
              <p>{words[0]}</p>
              <span>1 point</span>
            </div>
            <div onClick={() => onSelectWord(words[1])} className="word-box">
              <p>{words[1]}</p>
              <span>3 points</span>
            </div>
            <div onClick={() => onSelectWord(words[2])} className="word-box">
              <p>{words[2]}</p>
              <span>5 points</span>
            </div>
          </div>
        </div>
      </div>
    </View>
  );
};

export default WordChoosing;
