import React, { useEffect, useState } from 'react';
import { getBestScore } from '../server/api';
import GameSession from './GameSession';
import Score from './Score';

const HighScore = () => {
  const [points, setPoints] = useState(0);
  const [seconds, setTime] = useState(0);

  const fetchScore = async () => {
    const res = await getBestScore();
    setTime(res.time);
    setPoints(res.points);
  };

  useEffect(() => {
    fetchScore();
  }, []);
  return (
    <div>
      <h2>Best Score Until Now:</h2>
      <Score points={points} seconds={seconds} isBestScore={true} />
    </div>
  );
};

export default HighScore;
