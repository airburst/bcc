// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { prisma } from "../../server/db/client";

type Props = {
  rideId: string;
  userId: string;
};

export const addRiderToRide = async ({ rideId, userId }: Props) => {
  const result = await prisma.usersOnRides.create({ data: { rideId, userId } });

  return result;
};

// Only a user or admin can add/remove themselves from a ride
const joinRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session) {
    return res.status(401).send({
      error: "You must be signed in to view the protected content on this page."
    });
  }

  try {
    const { rideId, userId } = req.body;
    const success = await addRiderToRide({ rideId, userId });
    res.status(200).json(success);
  } catch (err) {
    console.log("🚀 ~ file: join-ride.ts ~ line 34 ~ joinRide ~ err", err);
    res.status(401).send({
      error: "Not authorised to use this API"
    });
  }
};

export default joinRide;
