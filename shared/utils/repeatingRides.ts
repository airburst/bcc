import { RRule } from "rrule";
import { RepeatingRideDb, RepeatingRide, TemplateRide } from "src/types";
import {
  daysInMonth,
  getDateFromString,
  getNextMonth,
  isWinter,
} from "./dates";

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
export const generateRide = (
  {
    id,
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
  }: RepeatingRideDb,
  date: string
) => {
  const ride = {
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
    scheduleId: id,
  };

  return Object.fromEntries(
    Object.entries(ride).filter(([, val]) => val)
  ) as unknown as TemplateRide;
};

export const makeRidesInPeriod = (
  template: RepeatingRideDb
): TemplateRide[] => {
  const { schedule } = template;
  const start = new Date();
  const nextMonth = getNextMonth();
  const lastDay = daysInMonth(nextMonth);
  const end = new Date(`${nextMonth.substring(0, 8)}${lastDay.toString()}`);
  // TODO: Override with template.latestInstanceDate

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
