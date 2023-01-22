import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './reducer';

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;
