import { createSlice } from '@reduxjs/toolkit';
import { WindSpeedUnits } from '../enums/wind-speed-units';

export interface WeatherState {
  lat: string | null;
  lon: string | null;
  temperatureUnit: string;
  windSpeedUnits: WindSpeedUnits;
}

const initialState: WeatherState = {
  lat: null,
  lon: null,
  temperatureUnit: 'Celsius',
  windSpeedUnits: WindSpeedUnits.KM,
};

type CoordsAction = {
  type: string;
  payload: string | null;
};

type SpeedAction = {
  type: string;
  payload: WindSpeedUnits;
};

type UnitsAction = {
  type: string;
  payload: string;
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLat: (state, action: CoordsAction) => {
      state.lat = action.payload;
    },
    setLon: (state, action: CoordsAction) => {
      state.lon = action.payload;
    },
    setTemperatureUnit: (state, action: UnitsAction) => {
      state.temperatureUnit = action.payload;
    },
    setWindSpeedUnit: (state, action: SpeedAction) => {
      state.windSpeedUnits = action.payload;
    },
  },
});

export const { setLat, setLon, setTemperatureUnit, setWindSpeedUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
