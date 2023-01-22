import { createSlice } from '@reduxjs/toolkit';

export interface WeatherState {
  lat: string | null;
  lon: string | null;
  temperatureUnit: string;
  windSpeedUnit: string;
}

const initialState: WeatherState = {
  lat: null,
  lon: null,
  temperatureUnit: 'Celsius',
  windSpeedUnit: 'km/h',
};

type CoordsAction = {
  type: string;
  payload: string | null;
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
    setWindSpeedUnit: (state, action: UnitsAction) => {
      state.windSpeedUnit = action.payload;
    },
  },
});

export const { setLat, setLon, setTemperatureUnit, setWindSpeedUnit } = weatherSlice.actions;

export default weatherSlice.reducer;
