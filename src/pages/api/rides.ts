// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { formatRideData, getQueryDateRange } from "../../../shared/utils";
import { prisma } from "../../server/db/client";
import { Preferences } from "../../types";
import { getUserPreferences, isLoggedIn } from "./auth/authHelpers";

type QueryType = {
  start?: string;
  end?: string;
};

export const getRides = async (
  query: QueryType,
  preferences: Preferences | undefined,
  isAuth = false
) => {
  const { start, end } = getQueryDateRange(query);
  try {
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
        {
          name: "asc",
        },
        {
          distance: "desc",
        },
      ],
    });

    return rides.map((ride) => formatRideData(ride, preferences, isAuth));
  } catch (error) {
    return new Error("Unable to fetch rides");
  }
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);
  const preferences = (await getUserPreferences(req, res)) as Preferences;
  const { query } = req;
  const rideData = await getRides(query, preferences, isAuth);

  return res.status(200).json(rideData);
};

export default rides;
