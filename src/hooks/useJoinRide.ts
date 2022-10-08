import useSWR from "swr";

type MutationProps = {
  userId?: string;
  rideId?: string;
};

// Query factory
const joinOrLeave = (action: string) => (ride: MutationProps) => {
  return fetch(`/api/${action}-ride`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(ride)
  }).then(res => res.json());
};

export const join = joinOrLeave("join");
export const leave = joinOrLeave("leave");

export const useJoinRide = (ride: MutationProps) => {
  const { data, error } = useSWR(`/api/join-ride`, () => join(ride));
  console.log("🚀 ~ file: useJoinRide.ts ~ line 25 ~ useJoinRide ~ data", data);

  return {
    result: data,
    loading: !error && !data,
    error
  };
};

export const useLeaveRide = (ride: MutationProps) => {
  const { data, error } = useSWR(`/api/leave-ride`, () => leave(ride));
  console.log(
    "🚀 ~ file: useJoinRide.ts ~ line 36 ~ useJoinRide ~ leave",
    leave
  );

  return {
    result: data,
    loading: !error && !data,
    error
  };
};
