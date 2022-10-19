import useSWR from "swr";

export const addPacelineRides = (date: string) =>
  fetch(`/api/ride/create-paceline`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(date),
  }).then((res) => res.json());

export const useAddPacelineRides = (date: string) => {
  const { data, error } = useSWR(`/api/ride/create-paceline`, () =>
    addPacelineRides(date)
  );

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
