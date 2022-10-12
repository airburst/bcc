// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isLeader } from "../auth/authHelpers";
import { Ride } from "../../../types";

export const changeRide = async (ride: Ride) => {
  const { id, ...data } = ride;
  try {
    const result = await prisma.ride.update({
      data,
      where: { id },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

// Only a logged-in user can join a ride
const editRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can create a ride.",
    });
  }

  try {
    const ride = req.body;
    // A user can only add themselves; a leader can add other riders
    const hasLeaderRole = await isLeader(req, res);

    if (hasLeaderRole) {
      const success = await changeRide(ride);
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

export default editRide;
