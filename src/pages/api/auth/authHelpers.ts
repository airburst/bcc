import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { DEFAULT_PREFERENCES } from "../../../constants";

// Session object returns the following shape:
/**
  {
    {
      name: 'mark.fairhurst',
      email: 'mark.fairhurst@outlook.com',
      id: 'cl8umxaaf0000tlvhyztr8ste'
    },
    expires: '2022-11-09T18:08:19.709Z',
    role: "USER" | "LEADER" | "ADMIN"
  }
 *
 */
export const isLoggedIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  return !!session;
};

// Logged in and the user id is same as session
export const isMe =
  (req: NextApiRequest, res: NextApiResponse) => async (userId: string) => {
    const session = await getServerAuthSession({ req, res });
    const user = session && session.user;

    return !!session && user?.id === userId;
  };

// An admin can also manage leader roles
export const isLeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const role = session && (session.user?.role as string);

  return !!session && role && ["LEADER", "ADMIN"].includes(role);
};

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  const role = session && session.user?.role;

  return !!session && role === "ADMIN";
};

export const getUserPreferences = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const session = await getServerAuthSession({ req, res });

  return session?.user?.preferences || DEFAULT_PREFERENCES;
};
