// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

type Props = {
  rideId: string;
  userId: string;
};

export const removeRiderFromRide = async ({ rideId, userId }: Props) => {
  const record = await prisma.usersOnRides.delete({
    where: {
      rideId_userId: {
        rideId,
        userId
      }
    }
  });

  return record;
};

// TODO: Secure route
// Only a user or admin can add/remove themselves from a ride
const leaveRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const { rideId, userId } = req.body;
  const success = await removeRiderFromRide({ rideId, userId });
  res.status(200).json(success);
};

export default leaveRide;
