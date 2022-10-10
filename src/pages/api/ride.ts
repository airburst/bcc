// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { formatRideData } from "../../../shared/utils";

export const getRide = async (id: string | string[] | undefined) => {
  const rideId = Array.isArray(id) ? id[0] : id;

  if (!rideId) {
    return null;
  }

  const ride = await prisma.ride.findUnique({
    where: {
      id: rideId
    },
    include: {
      users: {
        include: { user: true },
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!ride) {
    return null;
  }

  return formatRideData(ride);
};

const ride = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const rideDetails = await getRide(id);
  res.status(200).json(rideDetails);
};

export default ride;
