export interface ICity {
  name: string;
}

export interface ICoords {
  lat: number;
  lon: number;
}

export interface IWeather {
  dt: number;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };

  weather: [
    {
      main: string;
    },
  ];

  pop: number;
  wind: {
    speed: number;
  };
}

export interface IForecast {
  city: ICity;
  list: IWeather[];
}
