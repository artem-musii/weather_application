import axios from 'axios';
import { ISuggestions } from '../types/forecast.type';

export const getSuggestions = async (q: string) => {
  const weatherAPIKey = '35bcd86aaa2f86e435cf470a0a344c7e';
  const weatherAPIUrl = `http://api.openweathermap.org/data/2.5/find?q=${q}&appid=${weatherAPIKey}`;
  const response: { data: ISuggestions } = await axios.get(weatherAPIUrl);

  return response.data;
};
