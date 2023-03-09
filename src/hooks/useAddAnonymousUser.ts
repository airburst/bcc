import useSWR from "swr";

// Note: this is a copy of the type in AnonymousUserForm
type AnonymousUserValues = {
  id?: string | null;
  name: string;
  mobile?: string | null;
  emergency?: string | null;
  rideId: string;
};

export const addAnonymousUser = async (userAndRide: AnonymousUserValues) => {
  const { rideId, ...user } = userAndRide;

  try {
    // Create an anonymous user record
    const userResult = await fetch(`/api/user/create-anonymous`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
    // Get the userId
    const { id: userId } = userResult;
    // Create a UserToRide join record
    const joinResult = await fetch(`/api/ride/join-anonymous`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, rideId }),
    }).then((res) => res.json());

    return joinResult;
  } catch (err) {
    return { error: err };
  }
};

export const useAddAnonymousUser = (user: AnonymousUserValues) => {
  const { data, error } = useSWR(`/api/user/create-anon`, () =>
    addAnonymousUser(user)
  );

  return {
    user: data,
    loading: !error && !data,
    error,
  };
};
