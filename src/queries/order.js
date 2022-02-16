import axios from 'axios';
import { BASE_URL } from 'constants/index';

export const ORDER = async () => {
  const res = await axios.get(`${BASE_URL}/order`, {
    params: { type: 'ADMIN' },
  });
  return res.data;
};
