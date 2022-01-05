import axios from 'axios';
import { BASE_URL } from '../constants';

// Design Queries and Mutations Start

export const REGISTER = async (e) => {
  const res = await axios.post(BASE_URL + `/admin-register`, e);
  return res.data;
};

export const LOGIN = async (e) => {
  const res = await axios.post(BASE_URL + `/admin-login`, e);
  return res.data;
};
