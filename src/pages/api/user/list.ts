// src/pages/api/rides.ts
import { getServerAuthSession } from "@/server/auth";
import { isAdmin } from "@auth/authHelpers";
import type { NextApiRequest, NextApiResponse } from "next";
import { formatUser } from "../../../../shared/utils";
import { prisma } from "../../../server/db/client";

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
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authorised" });
  }

  const hasAdminRole = await isAdmin();

  if (hasAdminRole) {
    const userData = await listUsers();
    return res.status(200).json(userData);
  }
  return res.status(401).send({
    error: "Not authorised to use this API",
  });
};

export default profile;
