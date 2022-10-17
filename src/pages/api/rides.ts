// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { getNow, getNextWeek, formatRideData } from "../../../shared/utils";
import { isLoggedIn } from "./auth/authHelpers";

const nextDate = getNextWeek();

export const getRides = async (isAuth = false) => {
  const rides = await prisma.ride.findMany({
    where: {
      AND: [
        {
          date: {
            lte: nextDate,
            gte: getNow(),
          },
          deleted: false,
        },
      ],
    },
    include: {
      users: {
        include: { user: true },
      },
    },
    orderBy: [
      {
        date: "asc",
      },
    ],
  });

  return rides.map((ride) => formatRideData(ride, isAuth));
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);
  const rideData = await getRides(isAuth);
  return res.status(200).json(rideData);
};

export default rides;

// export const config = {
//   runtime: "experimental-edge",
// };
