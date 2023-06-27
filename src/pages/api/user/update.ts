// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Role } from "@prisma/client";
import { prisma } from "../../../server/db/client";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { isMe, isAdmin } from "../auth/authHelpers";
import { User } from "../../../types";

// Restricted editable fields: name, mobile
export const updateProfile = async (user: User) => {
  const { id, name, mobile, emergency, preferences, role } = user;

  try {
    const result = await prisma.user.update({
      data: {
        name,
        mobile,
        emergency,
        preferences,
        role: role as Role,
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

  try {
    const user = req.body;
    // A user can only add themselves; a leader can add other riders
    const isMyRecord = await isMe(req, res)(user.id);
    const hasLeaderRole = await isAdmin(req, res);

    if (isMyRecord || hasLeaderRole) {
      const userData = await updateProfile(user);
      return res.status(200).json(userData);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: err,
    });
  }
};

export default editProfile;
