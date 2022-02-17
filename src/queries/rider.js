import axios from 'axios';
import { BASE_URL } from 'constants/index';

export const RIDER = async () => {
  const res = await axios.get(`${BASE_URL}/driver`, {
    params: { type: 'ADMIN' },
  });
  return res.data;
};

export const RIDER_APPROVAL = async (e) => {
  const res = await axios.put(`${BASE_URL}/driver/approve`, e);
  return res.data;
};
