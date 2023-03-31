import useSWR from "swr";

const fetchRides = async (start?: string, end?: string) => {
  let url = `/api/new-rides?`;
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

type DateType = string | string[] | undefined;

export const useRides = (start?: DateType, end?: DateType) => {
  let url = `/api/rides`;
  let startDate: string;
  let endDate: string;
  let fetcher = () => fetchRides();

  if (start) {
    startDate = Array.isArray(start) ? start[0] || "" : start;
    url += `/${startDate}`;
    fetcher = () => fetchRides(startDate);
  }
  if (end) {
    endDate = Array.isArray(end) ? end[0] || "" : end;
    url += `/${endDate}`;
    fetcher = () => fetchRides(startDate, endDate);
  }

  const { data, error, mutate } = useSWR(url, fetcher);

  return {
    data,
    mutate,
    loading: !error && !data,
    error,
  };
};
