// src/pages/api/rides.ts
import { isAdmin, isMe } from "@/app/api/[...nextauth]/authHelpers";
import { getServerAuthSession } from "@/server/auth";
import { Role } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
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
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authorised" });
  }

  try {
    const user = req.body;
    // A user can only add themselves; a leader can add other riders
    const isMyRecord = await isMe()(user.id);
    const hasLeaderRole = await isAdmin();

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
