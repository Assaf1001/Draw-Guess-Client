import axios from 'axios';

const serverURL = process.env.REACT_APP_SERVER_URL;

export const getBestScore = async () => {
  try {
    const res = await axios.get(`${serverURL}/best-score`);
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const saveNewScore = async (score) => {
  try {
    const res = axios.post(`${serverURL}/best-score`, score);
    return res.data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};
