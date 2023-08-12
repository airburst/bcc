import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  FRIDAY_RIDES,
  SUNDAY,
  TUESDAY_RIDES,
  WEDNESDAY_HILLS,
  WEDNESDAY_RIDES,
} from "../../src/constants";
import { PartialRide, SeasonStartTime } from "../../src/types";
import { daysInMonth, isWinter } from "./dates";

dayjs.extend(utc);

type PartialRideWithDate = PartialRide & { date: string };

export const getStartTime = (date: string, startTime: SeasonStartTime) => {
  const season = isWinter(date) ? startTime.winter : startTime.summer;
  const rideTime = dayjs(date)
    .set("hour", season.hour)
    .set("minute", season.minute)
    .set("second", 0);
  return rideTime.toISOString();
};

const findRidesForDay = (date: string): PartialRideWithDate[] => {
  const day = dayjs(date).day();
  return [TUESDAY_RIDES, WEDNESDAY_RIDES, WEDNESDAY_HILLS, FRIDAY_RIDES, SUNDAY]
    .filter(({ day: rideDay }) => day === rideDay)
    .map(({ rides, startTime }) =>
      rides.map((r) => ({ ...r, date: getStartTime(date, startTime) }))
    )
    .flatMap((r) => r);
};

// Generate all rides for a given date
export const generateRides = (date: string) => {
  const rideList = findRidesForDay(date);

  return rideList.map((ride, index) => {
    if (ride.name !== "Paceline") {
      return ride;
    }

    const minutes = dayjs(ride.date).minute();
    const dateTime = dayjs(ride.date)
      .set("minute", minutes + index)
      .toISOString();

    return { ...ride, date: dateTime };
  });
};

export const generateRidesForMonth = (date: string) => {
  const lastDay = daysInMonth(date);
  // Generate a map of dates for the month in format yyyy-mm-dd
  const dateMap = Array.from(
    { length: lastDay },
    (_, i) => `${date.substring(0, 8)}${(i + 1).toString().padStart(2, "0")}`
  );
  // Walk through each day and generate rides
  // Flatten map and return
  return dateMap.flatMap((dt) => generateRides(dt));
};
