// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isMe, isLeader } from "../auth/authHelpers";

type Props = {
  rideId: string;
  userId: string;
};

// TODO: Check whether rider is already on a ride on the same day
// Prevent joining more than one
export const addRiderToRide = async ({ rideId, userId }: Props) => {
  const result = await prisma.usersOnRides.create({ data: { rideId, userId } });

  return result;
};

// Only a logged-in user can join a ride
const joinRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "You must be signed in to join a ride.",
    });
  }

  try {
    const { rideId, userId } = req.body;
    // A user can only add themselves; a leader can add other riders
    const isMyRecord = await isMe(req, res)(userId);
    const hasLeaderRole = await isLeader(req, res);

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

export const joinRideAnonymously = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { rideId, userId } = req.body;
    const success = await addRiderToRide({ rideId, userId });
    return res.status(200).json(success);
  } catch (err) {
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};
