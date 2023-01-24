import { useEffect, useState } from 'react';
import { createRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DrawingCanvas from '../components/DrawCanvas';
import View from '../components/View';
import { GameContext } from '../context/GameContextProvider';
import { socket } from '../socket/socket';

const Drawing = () => {
  const navigate = useNavigate();
  const { state } = useContext(GameContext);
  const canvasRef = createRef();

  const onClickSend = async () => {
    const paths = await canvasRef.current.exportPaths();

    socket.emit('sendGameData', {
      socketId: state.opponent.id,
      word: state.word,
      paths,
      score: state.score,
    });

    navigate('/waiting');
  };

  return (
    <View>
      <div className="drawing">
        <h2>
          Now draw the word <br />
          <span className="selected-word">{state.word}</span>
        </h2>
        <DrawingCanvas canvasRef={canvasRef} />
        <div onClick={onClickSend} className="word-box">
          <p>Send</p>
        </div>
      </div>
    </View>
  );
};

export default Drawing;
