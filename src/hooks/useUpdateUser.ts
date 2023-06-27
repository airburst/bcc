import useSWR from "swr";
import { Role } from "@prisma/client";
import { Preferences } from "../types";

type UpdateUser = {
  id: string;
  name: string;
  mobile?: string | null;
  emergency?: string | null;
  preferences?: Preferences | null;
  role?: Role;
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
    user: data,
    loading: !error && !data,
    error,
  };
};
