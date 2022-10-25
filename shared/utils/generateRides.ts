import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { isWinter } from "./dates";
import { PACELINE, SATURDAY_SOCIAL, SUNDAY } from "../../src/constants";
import { PartialRide, SeasonStartTime } from "../../src/types";

dayjs.extend(utc);

type PartialRideWithDate = PartialRide & { date: string };

export const getStartTime = (date: string, startTime: SeasonStartTime) => {
  const season = isWinter(date) ? startTime.winter : startTime.summer;
  const rideTime = dayjs(date)
    .set("hour", season.hour)
    .set("minute", season.minute)
    .set("second", 0);
  // Calculate utc offset
  // const offset = dayjs().utcOffset();
  // return rideTime.add(offset, "minute").toISOString();
  return rideTime.toISOString();
};

const findRidesForDay = (date: string): PartialRideWithDate[] => {
  const day = dayjs(date).day();
  return [PACELINE, SATURDAY_SOCIAL, SUNDAY]
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
