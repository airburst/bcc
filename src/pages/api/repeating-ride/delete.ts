// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isAdmin } from "../auth/authHelpers";

export const removeRepeatingRide = async (id: string) => {
  try {
    const result = await prisma.repeatingRide.delete({
      where: { id },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

// Only a logged-in user can join a ride
const deleteRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can delete a ride.",
    });
  }

  try {
    const id = req.body;
    const hasAdminRole = await isAdmin(req, res);

    if (hasAdminRole) {
      const success = await removeRepeatingRide(id);
      return res.status(200).json(success);
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

export default deleteRide;
