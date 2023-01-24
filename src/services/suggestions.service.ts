import axios from 'axios';
import { ISuggestions } from '../types';
import { API_KEYS } from '../app-keys/app-keys';

export const getSuggestions = async (q: string) => {
  const weatherAPIUrl = `${API_KEYS.API_URL}find?q=${q}&appid=${API_KEYS.API_KEY}`;
  const response: { data: ISuggestions } = await axios.get(weatherAPIUrl);

  return response.data;
};
