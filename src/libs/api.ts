import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://__IP_ADRESS__:3333'
});
