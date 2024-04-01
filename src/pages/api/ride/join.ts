// src/pages/api/add-rider-to-ride.ts
import {
  isLeader,
  isLoggedIn,
  isMe,
} from "@/app/api/[...nextauth]/authHelpers";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

type Props = {
  rideId: string;
  userId: string;
};

export const addRiderToRide = async ({ rideId, userId }: Props) => {
  const result = await prisma.usersOnRides.create({ data: { rideId, userId } });

  return result;
};

// Only a logged-in user can join a ride
const joinRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn();

  if (!isAuth) {
    return res.status(401).send({
      error: "You must be signed in to join a ride.",
    });
  }

  try {
    const { rideId, userId } = req.body;
    // A user can only add themselves; a leader can add other riders
    const isMyRecord = await isMe()(userId);
    const hasLeaderRole = await isLeader();

    if (isMyRecord || hasLeaderRole) {
      const success = await addRiderToRide({ rideId, userId });
      return res.status(200).json(success);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};

export default joinRide;
