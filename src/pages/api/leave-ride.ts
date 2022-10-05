// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
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

// Only a user or admin can add/remove themselves from a ride
const leaveRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error: "You must be signed in to view the protected content on this page."
    });
  }

  try {
    const { rideId, userId } = req.body;
    const success = await removeRiderFromRide({ rideId, userId });
    res.status(200).json(success);
  } catch (err) {
    console.log("🚀 ~ file: leave-ride.ts ~ line 39 ~ leaveRide ~ err", err);
    res.status(401).send({
      error: "Not authorised to use this API"
    });
  }
};

export default leaveRide;
