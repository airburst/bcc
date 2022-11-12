import useSWR from "swr";

export const updateRideNotes = (
  rideId: string,
  userId: string,
  notes: string
) =>
  fetch(`/api/ride/update-ride-notes`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ rideId, userId, notes }),
  }).then((res) => res.json());

export const useUpdateRideNotes = (
  rideId: string,
  userId: string,
  notes: string
) => {
  const { data, error } = useSWR(`/api/ride/${rideId}`, () =>
    updateRideNotes(rideId, userId, notes)
  );

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
