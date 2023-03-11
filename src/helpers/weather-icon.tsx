import React, { ReactElement } from 'react';
import ClearSky from '../assets/images/clear-sky.svg';
import Rain from '../assets/images/rain-cloud.svg';
import Clouds from '../assets/images/clouds.svg';
import Extreme from '../assets/images/extreme.svg';
import Drizzle from '../assets/images/drizzle-cloud.svg';
import Humidity from '../assets/images/humidity.svg';
import Wind from '../assets/images/wind.svg';
import Precipitation from '../assets/images/precipitation.svg';
import Snow from '../assets/images/snow.svg';
import { SvgProps } from 'react-native-svg';
import { WeatherCondition } from '../enums/weather-conditions';

export const WeatherIcon = ({
  condition,
  width,
  height,
}: {
  condition: string;
  width: string;
  height: string;
}): ReactElement => {
  let Icon: React.FC<SvgProps>;
  switch (condition) {
    case WeatherCondition.Clear:
      Icon = ClearSky;
      break;
    case WeatherCondition.Rain:
      Icon = Rain;
      break;
    case WeatherCondition.Clouds:
      Icon = Clouds;
      break;
    case WeatherCondition.Drizzle:
      Icon = Drizzle;
      break;
    case WeatherCondition.Extreme:
      Icon = Extreme;
      break;
    case WeatherCondition.Humidity:
      Icon = Humidity;
      break;
    case WeatherCondition.Wind:
      Icon = Wind;
      break;
    case WeatherCondition.Precipitation:
      Icon = Precipitation;
      break;
    case WeatherCondition.Snow:
      Icon = Snow;
      break;
    default:
      Icon = ClearSky;
  }
  return <Icon width={width} height={height} />;
};
