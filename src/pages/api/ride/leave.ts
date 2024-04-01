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

export const removeRiderFromRide = async ({ rideId, userId }: Props) => {
  const record = await prisma.usersOnRides.delete({
    where: {
      rideId_userId: {
        rideId,
        userId,
      },
    },
  });

  return record;
};

// Only a logged-in user can remove themselves from a ride
const leaveRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn();

  if (!isAuth) {
    return res.status(401).send({
      error: "You must be signed in to join a ride.",
    });
  }

  try {
    const { rideId, userId } = req.body;
    // A user can only remove themselves; a leader can remove other riders
    const isMyRecord = await isMe()(userId);
    const hasLeaderRole = await isLeader();

    if (isMyRecord || hasLeaderRole) {
      const success = await removeRiderFromRide({ rideId, userId });
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

export default leaveRide;
