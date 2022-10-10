import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

export const isLoggedIn = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  // TODO: Returns this, but we also need role
  //   {
  //     name: 'mark.fairhurst',
  //     email: 'mark.fairhurst@outlook.com',
  //     id: 'cl8umxaaf0000tlvhyztr8ste'
  //   },
  //   expires: '2022-11-09T18:08:19.709Z'
  // }

  return !!session;
};

export const isLeader = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  // TODO:

  return !!session;
};

export const isAdmin = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  // TODO:

  return !!session;
};
