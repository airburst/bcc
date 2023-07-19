import useSWR from "swr";

export const deleteRepeatingRide = async (id: string | string[]) => {
  const results = await fetch(`/api/repeating-ride/delete`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).then((res) => res.json());
  return results;
};

export const useDeleteRepeatingRide = (id: string) => {
  const { data, error } = useSWR(`/api/repeating-ride/delete`, () =>
    deleteRepeatingRide(id)
  );

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
