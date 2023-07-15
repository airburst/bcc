import { RepeatingRide, RepeatingRideDb, RideFormValues } from "src/types";
import { makeUtcDate } from "./dates";
import { repeatingRideToDb } from "./repeatingRides";

export const makeRide = (formData: RideFormValues) => {
  const {
    name,
    date,
    time,
    group,
    meetPoint,
    destination,
    distance,
    leader,
    route,
    notes,
    limit,
  } = formData;
  const utcDate = makeUtcDate(date, time);

  return {
    name,
    date: utcDate,
    group,
    destination,
    distance: +distance,
    leader,
    route,
    meetPoint,
    notes,
    limit,
  };
};

// Filter ride form with repeating information into a valid API request shape
export const makeRepeatingRide = (
  formData: RideFormValues
): RepeatingRideDb => {
  const { bymonth, bymonthday, byweekno, byweekday, ...data } = formData;
  // Cast string form values to numbers
  const weekday = byweekday || 5;
  const weekno = byweekno || 1;
  const month = bymonth || 1;
  const monthday = bymonthday || 1;

  let payload: RepeatingRide = {
    ...data,
  };
  // Remove unwanted keys
  // Weekly - remove all monthly and annual values
  if (+formData.freq === 2) {
    payload = { ...payload, byweekday: +weekday };
  }
  if (+formData.freq === 1) {
    if (bymonth && bymonthday) {
      payload = { ...payload, bymonth: +month, bymonthday: +monthday };
    } else {
      payload = { ...payload, byweekno: +weekno, byweekday: +weekday };
    }
  }
  // TODO: Annual

  // Convert to RRule
  return repeatingRideToDb(payload);
};
