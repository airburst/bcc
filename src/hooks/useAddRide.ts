import useSWR from "swr";
import { Ride } from "../types";

type NewRide = Omit<Ride, "id" | "day" | "time">;

export const addRide = (ride: NewRide) =>
  fetch(`/api/create-ride`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ride),
  }).then((res) => res.json());

export const useAddRide = (ride: NewRide) => {
  const { data, error } = useSWR(`/api/create-ride`, () => addRide(ride));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
