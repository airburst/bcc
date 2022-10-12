import useSWR from "swr";

export const deleteRide = (id: string | string[]) =>
  fetch(`/api/ride/delete`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  }).then((res) => res.json());

export const useDeleteRide = (id: string) => {
  const { data, error } = useSWR(`/api/ride/delete`, () => deleteRide(id));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
