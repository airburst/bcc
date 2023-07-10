import { RRule } from "rrule";
import { RepeatingRide, RepeatingRideDb } from "types";

export const convertToRRule = (data: RepeatingRide): string => {
  const { freq, interval = 1, startDate, endDate } = data;

  const dtstart = new Date(startDate);
  const until = endDate ? new Date(endDate) : undefined;

  const rrule = new RRule({
    freq,
    interval,
    // byweekday: [RRule.MO, RRule.FR],
    dtstart,
    until,
  });

  return rrule.toString();
};

export const repeatingRideToDb = (ride: RepeatingRide): RepeatingRideDb => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { freq, interval, startDate, endDate, ...rest } = ride;
  const schedule = convertToRRule(ride);

  return {
    schedule,
    ...rest,
  };
};

export const repeatingRideFromDb = (ride: RepeatingRideDb): RepeatingRide => {
  const { schedule, ...rest } = ride;
  // Convert rrule back into editable variables
  const rrule = RRule.fromString(schedule);

  const { freq, dtstart, until, interval } = rrule.options;

  return {
    ...rest,
    freq,
    interval,
    startDate: new Date(dtstart).toISOString(),
    endDate: until ? new Date(until).toISOString() : undefined,
  };
};
