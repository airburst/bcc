import { RepeatingRide, RideFormValues } from "src/types";
import { makeUtcDate } from "./dates";
import { repeatingRideToDb } from "./repeatingRides";

export const makeRide = ({
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
}: RideFormValues) => {
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
export const makeRepeatingRide = (formData: RideFormValues): RepeatingRide => {
  console.log("🚀 ~ makeRepeatingRide ~ formData:", formData);
  // Remove unwanted keys
  const { date: startDate } = formData;

  const convertedWithRule = repeatingRideToDb(formData);
  console.log("🚀 ~ convertedWithRule:", convertedWithRule);

  return {
    ...convertedWithRule,
    startDate, // FIXME:
    freq: 1, // FIXME:
  };
};
