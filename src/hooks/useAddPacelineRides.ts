import useSWR from "swr";

export const addRidesForDay = (date: string) =>
  fetch(`/api/ride/create-rides-for-day`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  }).then((res) => res.json());

export const useAddPacelineRides = (date: string) => {
  const { data, error } = useSWR(`/api/ride/create-rides-for-day`, () =>
    addRidesForDay(date)
  );

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
