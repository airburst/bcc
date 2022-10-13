import useSWR from "swr";

export const deleteRide = async (id: string | string[]) => {
  const results = await fetch(`/api/ride/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).then((res) => res.json());
  return results;
};

export const useDeleteRide = (id: string) => {
  const { data, error } = useSWR(`/api/ride/delete`, () => deleteRide(id));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
