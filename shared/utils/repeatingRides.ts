import { RRule } from "rrule";
import { RepeatingRide, RepeatingRideDb } from "types";
import { isWinter } from "./dates";

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

export const changeToWinterTime = (
  dateTime: Date,
  winterStartTime: string
): Date => {
  if (!isWinter(dateTime.toISOString())) {
    return dateTime;
  }

  // TODO: account for UTC in winter time
  const [hours, minutes] = winterStartTime.split(":");

  if (hours) {
    dateTime.setHours(+hours);
  }
  if (minutes) {
    dateTime.setMinutes(+minutes);
  }

  return dateTime;
};

export const getRidesInPeriod = (template: RepeatingRideDb): Date[] => {
  const { schedule } = template;
  const start = new Date();
  // TODO: Set end of following month
  const end = new Date(2023, 7, 31);
  const rideDates = RRule.fromString(schedule).between(start, end);

  // Update timings if winterStartTime is set
  if (typeof template.winterStartTime === "string") {
    return rideDates.map((r) =>
      changeToWinterTime(r, template.winterStartTime as string)
    );
  }

  return rideDates;
};
