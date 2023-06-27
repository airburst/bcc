// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { isAdmin } from "../auth/authHelpers";
import { formatUser } from "../../../../shared/utils";

export const listUsers = async () => {
  const userRecords = await prisma.user.findMany({
    orderBy: { name: "asc" },
  });

  if (!userRecords) {
    return {};
  }

  return userRecords.map((user) => formatUser(user, null, true));
};

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authorised" });
  }

  const hasAdminRole = await isAdmin(req, res);

  if (hasAdminRole) {
    const userData = await listUsers();
    return res.status(200).json(userData);
  }
  return res.status(401).send({
    error: "Not authorised to use this API",
  });
};

export default profile;
