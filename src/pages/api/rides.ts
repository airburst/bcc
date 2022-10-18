// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { formatRideData, getQueryDateRange } from "../../../shared/utils";
import { isLoggedIn } from "./auth/authHelpers";

type QueryType = {
  start?: string;
  end?: string;
};

export const getRides = async (query: QueryType, isAuth = false) => {
  const { start, end } = getQueryDateRange(query);

  const rides = await prisma.ride.findMany({
    where: {
      AND: [
        {
          date: {
            gte: start,
            lte: end,
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
  const { query } = req;
  const rideData = await getRides(query, isAuth);
  return res.status(200).json(rideData);
};

export default rides;

// export const config = {
//   runtime: "experimental-edge",
// };
