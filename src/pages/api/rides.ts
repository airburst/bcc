// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { getNextWeek, formatRideData } from "../../../shared/utils";

const now = new Date().toISOString();
const nextDate = getNextWeek();

export const getRides = async () => {
  const rides = await prisma.ride.findMany({
    where: {
      date: {
        lte: nextDate,
        gte: now
      }
    },
    include: {
      users: {
        include: { user: true }
      }
    },
    orderBy: [
      {
        date: "asc"
      }
    ]
  });

  return rides.map(ride => formatRideData(ride));
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const rides = await getRides();
  res.status(200).json(rides);
};

export default rides;
