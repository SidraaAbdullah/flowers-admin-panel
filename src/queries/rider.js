import axios from 'axios';
import { BASE_URL } from 'constants/index';

export const RIDER = async () => {
  const res = await axios.get(`${BASE_URL}/driver`, {
    params: { type: 'ADMIN' },
  });
  return res.data;
};
