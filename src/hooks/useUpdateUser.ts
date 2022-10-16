import useSWR from "swr";

type UpdateUser = {
  id: string;
  name: string;
  mobile?: string | null;
};

export const updateUser = (user: UpdateUser) =>
  fetch(`/api/user/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());

export const useUpdateUser = (user: UpdateUser) => {
  const { data, error } = useSWR(`/api/user/update`, () => updateUser(user));

  return {
    ride: data,
    loading: !error && !data,
    error,
  };
};
