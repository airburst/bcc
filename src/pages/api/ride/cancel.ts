// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isLeader } from "../auth/authHelpers";

export const doCancelRide = async (id: string) => {
  try {
    const result = await prisma.ride.update({
      data: { cancelled: true },
      where: { id },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

const cancelRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can cancel a ride.",
    });
  }

  try {
    const id = req.body;
    const hasLeaderRole = await isLeader(req, res);

    if (hasLeaderRole) {
      const success = await doCancelRide(id);
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

export default cancelRide;
