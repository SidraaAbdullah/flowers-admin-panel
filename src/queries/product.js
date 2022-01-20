import axios from 'axios';
import { BASE_URL } from 'constants/index';

// Design Queries and Mutations Start

export const CREATE_PRODUCT = async (e) => {
  const res = await axios.post(`${BASE_URL}/product`, e);
  return res.data;
};

export const CREATE_CATEGORY = async (e) => {
  const res = await axios.post(`${BASE_URL}/category`, e);
  return res.data;
};