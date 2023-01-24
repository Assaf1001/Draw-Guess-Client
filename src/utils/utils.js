import randomWords from 'random-words';
import moment from 'moment';

const levelDifficality = {
  easy: (length) => length === 3 || length === 4,
  medium: (length) => length === 5,
  hard: (length) => length >= 6,
};

export const generateWord = (level) => {
  let word;

  do {
    word = randomWords();
  } while (!levelDifficality[level](word.length));
  return word;
};

export const formatSecondsToTime = (seconds) => {
  return moment
    .utc(moment.duration(seconds, 'seconds').as('milliseconds'))
    .format('HH:mm:ss');
};
