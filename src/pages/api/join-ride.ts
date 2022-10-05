// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

type Props = {
  rideId: string;
  userId: string;
};

export const addRiderToRide = async ({ rideId, userId }: Props) => {
  const result = await prisma.usersOnRides.create({ data: { rideId, userId } });

  return result;
};

// TODO: Secure route
// Only a user or admin can add/remove themselves from a ride
const joinRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const { rideId, userId } = req.body;
  const success = await addRiderToRide({ rideId, userId });
  res.status(200).json(success);
};

export default joinRide;
