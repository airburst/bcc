import { RRule } from "rrule";
import { RepeatingRideDb, RepeatingRide, PartialRide } from "src/types";
import { getDateFromString, isWinter } from "./dates";

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
): string => {
  const adjustedDate = getDateFromString(dateTime.toISOString());

  if (!isWinter(adjustedDate)) {
    return adjustedDate;
  }

  const [hours, minutes] = winterStartTime.split(":");

  if (hours) {
    dateTime.setHours(+hours);
  }
  if (minutes) {
    dateTime.setMinutes(+minutes);
  }

  return getDateFromString(dateTime.toISOString());
};

// Generate ride for a given template and date
export const generateRide = (template: RepeatingRideDb, date: string) => {
  const {
    name,
    destination,
    group,
    distance,
    meetPoint,
    route,
    leader,
    speed,
    notes,
    limit,
  } = template;

  return {
    name,
    date,
    destination,
    group,
    distance,
    meetPoint,
    route,
    leader,
    speed,
    notes,
    limit,
  };
};

export const makeRidesInPeriod = (template: RepeatingRideDb): PartialRide[] => {
  const { schedule } = template;
  const start = new Date();
  // TODO: Set end of following month
  const end = new Date(2023, 7, 31);
  const rideDates = RRule.fromString(schedule).between(start, end);

  // Update timings if winterStartTime is set
  if (typeof template.winterStartTime === "string") {
    return rideDates.map((r) =>
      generateRide(
        template,
        changeToWinterTime(r, template.winterStartTime as string)
      )
    );
  }

  return rideDates.map((r) =>
    generateRide(template, getDateFromString(r.toISOString()))
  );
};
