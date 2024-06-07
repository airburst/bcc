import useSWR from "swr";
import { RepeatingRide } from "../types";

export const updateRepeatingRide = (ride: RepeatingRide) =>
  fetch(`/api/repeating-ride/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ride),
  }).then((res) => res.json());

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
