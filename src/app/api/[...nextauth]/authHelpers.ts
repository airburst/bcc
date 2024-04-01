import { DEFAULT_PREFERENCES } from "@/constants";
import { getServerAuthSession } from "@/server/auth";

export const isLoggedIn = async () => {
  const session = await getServerAuthSession();

  return !!session;
};

// Logged in and the user id is same as session
export const isMe = () => async (userId: string) => {
  const session = await getServerAuthSession();
  const user = session && session.user;

  return !!session && user?.id === userId;
};

export const getUser = async () => {
  const session = await getServerAuthSession();

  return session?.user;
};

// An admin can also manage leader roles
export const isLeader = async () => {
  const session = await getServerAuthSession();
  const role = session && (session.user?.role as string);

  return !!session && role && ["LEADER", "ADMIN"].includes(role);
};

export const isAdmin = async () => {
  const session = await getServerAuthSession();
  const role = session && session.user?.role;

  return !!session && role === "ADMIN";
};

// TODO: Deprecate and remove
export const getUserPreferences = async () => {
  const session = await getServerAuthSession();

  return session?.user?.preferences || DEFAULT_PREFERENCES;
};
