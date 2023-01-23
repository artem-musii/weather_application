import { WindSpeedUnits } from '../enums/wind-speed-units';

export const convertSpeed = (speed: number, unit: WindSpeedUnits) => {
  switch (unit) {
    case WindSpeedUnits.KM:
      return Math.round(speed * 3.6);
    case WindSpeedUnits.MPH:
      return Math.round(speed * 2.237);
    default:
      return Math.round(speed);
  }
};
