import { formatSecondsToTime } from '../utils/utils';

const Score = ({ points, seconds, isBestScore = false }) => {
  return (
    <div className="score">
      <p>{isBestScore ? 'Best' : 'Game'} score</p>
      <div>
        Points: <span>{points}</span>
      </div>
      <div>
        Time: <span>{formatSecondsToTime(seconds)}</span>
      </div>
    </div>
  );
};

export default Score;
