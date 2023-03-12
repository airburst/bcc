import useSWR from "swr";

export const cancelRide = async (id: string | string[]) => {
  const results = await fetch(`/api/ride/cancel`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).then((res) => res.json());
  return results;
};

export const useCancelRide = (id: string) => {
  const { data, error } = useSWR(`/api/ride/cancel`, () => cancelRide(id));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
