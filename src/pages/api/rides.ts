// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { getNextWeek, formatUserName } from "../../../shared/utils";

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

  return rides.map(ride => ({
    ...ride,
    date: ride.date.toISOString(),
    users: ride.users.map(({ user }) => ({
      id: user.id,
      name: formatUserName(user.name),
      mobile: user.mobile
    }))
  }));
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const rides = await getRides();
  res.status(200).json(rides);
};

export default rides;
