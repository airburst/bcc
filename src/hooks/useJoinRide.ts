import useSWR from "swr";

type MutationProps = {
  userId?: string;
  rideId?: string;
};

// Query factory
const joinOrLeave = (action: string) => (ride: MutationProps) =>
  fetch(`/api/ride/${action}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ride),
  }).then((res) => res.json());

export const join = joinOrLeave("join");
export const leave = joinOrLeave("leave");

export const useJoinRide = (ride: MutationProps) => {
  const { data, error } = useSWR(`/api/ride/join`, () => join(ride));

  return {
    result: data,
    loading: !error && !data,
    error,
  };
};

export const useLeaveRide = (ride: MutationProps) => {
  const { data, error } = useSWR(`/api/ride/leave`, () => leave(ride));

  return {
    result: data,
    loading: !error && !data,
    error,
  };
};
