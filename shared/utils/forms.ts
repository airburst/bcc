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
  const {
    date: startDate,
    bymonth,
    bymonthday,
    byweekno,
    byweekday,
    ...data
  } = formData;

  let payload: RepeatingRide = { ...data, startDate };
  // Remove unwanted keys
  // Weekly - remove all monthly and annual values
  if (formData.freq === 2) {
    payload = { ...payload, byweekday };
  }
  if (formData.freq === 1) {
    if (bymonth && bymonthday) {
      payload = { ...payload, bymonth, bymonthday };
    } else {
      payload = { ...payload, byweekno, byweekday };
    }
  }
  // TODO: Annual

  // Convert to RRule
  return repeatingRideToDb(payload);
};
