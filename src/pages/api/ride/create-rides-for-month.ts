// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isLeader } from "../auth/authHelpers";
import { generateRidesForMonth } from "../../../../shared/utils";

export const addRidesForMonth = async (date: string) => {
  const result = await prisma.ride.createMany({
    data: generateRidesForMonth(date),
  });
  return result;
};

// Only a logged-in user can join a ride
const createRidesForMonth = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can create rides",
    });
  }

  try {
    const date = req.body;

    // A user can only add themselves; a leader can add other riders
    const hasLeaderRole = await isLeader(req, res);

    if (hasLeaderRole) {
      const success = await addRidesForMonth(date);

      return res.status(200).json(success);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};

export default createRidesForMonth;
