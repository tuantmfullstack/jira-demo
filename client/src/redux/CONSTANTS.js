import axios from 'axios';
import Cookies from 'universal-cookie';

export const URL = 'http://localhost:1337/';

export const axiosPro = axios.create({
  baseURL: `${URL}`,
});

axiosPro.interceptors.request.use((config) => {
  const cookies = new Cookies();
  const token = cookies.get('token');

  config.headers.authorization = `${token ? `Bearer ${token}` : ''}`;
  return config;
});
