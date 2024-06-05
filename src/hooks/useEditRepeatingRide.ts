import { repeatingRideToDb } from "@utils/repeatingRides";
import useSWR from "swr";
import { RepeatingRide, RepeatingRideDb } from "../types";

export const updateRepeatingRide = (repeatingRide: RepeatingRide) => {
  const convertedRide: RepeatingRideDb = repeatingRideToDb(repeatingRide);
  console.log("🚀 ~ updateRepeatingRide ~ convertedRide:", convertedRide);

  return fetch(`/api/repeating-ride/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(repeatingRide),
  }).then((res) => res.json());
};

export const useEditRepeatingRide = (repeatingRide: RepeatingRide) => {
  const { data, error } = useSWR(`/api/repeating-ride/create`, () =>
    updateRepeatingRide(repeatingRide)
  );

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
