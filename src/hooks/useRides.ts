import useSWR from "swr";

const fetchRides = async (start?: string, end?: string) => {
  let url = `/api/rides?`;
  if (start) {
    url += `start=${start}`;
  }
  if (end) {
    url += `&end=${end}`;
  }

  const res = await fetch(url);
  const data = await res.json();
  return data;
};

export const useRides = (start?: string, end?: string) => {
  const { data, error, mutate } = useSWR(`/api/rides/${start}/${end}`, () =>
    fetchRides(start, end)
  );

  return {
    data,
    mutate,
    loading: !error && !data,
    error,
  };
};
