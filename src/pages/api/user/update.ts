// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { isMe, isAdmin } from "../auth/authHelpers";
import { User } from "../../../types";

// Restricted editable fields: name, mobile
export const updateProfile = async (user: User) => {
  const { id, name, mobile } = user;
  try {
    const result = await prisma.user.update({
      data: {
        name,
        mobile,
      },
      where: { id },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

const editProfile = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authorised" });
  }

  const isMyRecord = await isMe(req, res)(session.user.id);
  const hasLeaderRole = await isAdmin(req, res);

  if (isMyRecord || hasLeaderRole) {
    const userData = await updateProfile(session.user as User);
    return res.status(200).json(userData);
  }
  return res.status(401).send({
    error: "Not authorised to use this API",
  });
};

export default editProfile;
