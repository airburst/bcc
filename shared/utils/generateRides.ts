import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { PACELINE_RIDES } from "../../src/constants";

dayjs.extend(utc);

// Does start time change for Winter (1 Nov - 28 Feb)?
export const getNextPaceline = (date: string) => {
  const firstRide = dayjs(date) // Saturday
    .set("hour", 8)
    .set("minute", 40)
    .set("second", 0);
  // Calculate utc offset
  const offset = dayjs().utcOffset();
  return firstRide.add(offset, "minute").toISOString();
};

export const generateRides = (date: string) => {
  const nextDate = getNextPaceline(date);

  return PACELINE_RIDES.map((ride, index) => {
    const minutes = dayjs(nextDate).minute();
    const dateTime = dayjs(nextDate)
      .set("minute", minutes + index)
      .toISOString();
    return {
      ...ride,
      date: dateTime,
    };
  });
};
