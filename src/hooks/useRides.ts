import useSWR from "swr";

const fetchRides = async () => {
  const res = await fetch(`/api/rides`);
  const data = await res.json();
  return data;
};

export const useRides = () => {
  const { data, error } = useSWR(`/api/rides`, () => fetchRides());

  return {
    data,
    loading: !error && !data,
    error,
  };
};
