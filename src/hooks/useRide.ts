import useSWR from "swr";

const fetchRide = async (id: string | string[] | undefined) => {
  const res = await fetch(`/api/ride?id=${id}`);
  const data = await res.json();
  return data;
};

export const useRide = (id: string | string[] | undefined) => {
  const { data, error } = useSWR(`/api/ride`, () => fetchRide(id));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
