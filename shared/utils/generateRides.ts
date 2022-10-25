import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { PACELINE, SATURDAY_SOCIAL, SUNDAY } from "../../src/constants";
import { PartialRide } from "../../src/types";

dayjs.extend(utc);

const findRidesForDay = (day: number): PartialRide[] =>
  [PACELINE, SATURDAY_SOCIAL, SUNDAY]
    .filter(({ day: rideDay }) => day === rideDay)
    .map(({ rides }) => rides)
    .flatMap((r) => r);

// TODO: time change for Winter (1 Nov - 28 Feb)?
export const getStartTime = (date: string, time: string) => {
  const [hour, minute] = time.split(":").map((t) => +t);
  const rideTime = dayjs(date)
    .set("hour", hour || 0)
    .set("minute", minute || 0)
    .set("second", 0);
  // Calculate utc offset
  // const offset = dayjs().utcOffset();
  // return rideTime.add(offset, "minute").toISOString();
  return rideTime.toISOString();
};
// TODO: time change for Winter (1 Nov - 28 Feb)?
// Paceline starts are rolling minute intervals
export const getPLStartTime = (date: string) => {
  const rideTime = dayjs(date)
    .set("hour", PACELINE.startTime.summer.hour)
    .set("minute", PACELINE.startTime.summer.minute)
    .set("second", 0);
  // Calculate utc offset
  // const offset = dayjs().utcOffset();
  // return rideTime.add(offset, "minute").toISOString();
  return rideTime.toISOString();
};

// Generate all rides for a given date
export const generateRides = (date: string) => {
  const day = dayjs(date).day();
  const rideList = findRidesForDay(day);
  const pacelineStartTime = getPLStartTime(date);
  let dateTime;

  return rideList.map((ride, index) => {
    const { time, ...rest } = ride;

    // FIXME: Set start time for Sunday rides
    if (time) {
      dateTime = getStartTime(date, time);
    } else {
      const minutes = dayjs(pacelineStartTime).minute();
      dateTime = dayjs(pacelineStartTime)
        .set("minute", minutes + index)
        .toISOString();
    }
    return {
      ...rest,
      date: dateTime,
    };
  });
};
