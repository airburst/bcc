import useSWR from "swr";
import { Ride } from "../types";

type UpdateRide = Omit<Ride, "day" | "time">;

export const updateRide = (ride: UpdateRide) =>
  fetch(`/api/ride/edit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ride),
  }).then((res) => res.json());

export const useEditRide = (ride: UpdateRide) => {
  const { data, error } = useSWR(`/api/ride/edit`, () => updateRide(ride));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
