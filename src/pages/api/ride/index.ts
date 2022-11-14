// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { formatRideData } from "../../../../shared/utils";
import { isLoggedIn, getUserPreferences } from "../auth/authHelpers";
import { Preferences } from "../../../types";

export const getRide = async (
  id: string | string[] | undefined,
  preferences: Preferences | undefined,
  isAuth = false
) => {
  const rideId = Array.isArray(id) ? id[0] : id;

  if (!rideId) {
    return null;
  }

  const ride = await prisma.ride.findUnique({
    where: {
      id: rideId,
    },
    include: {
      users: {
        include: { user: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!ride || ride.deleted) {
    return {};
  }

  return formatRideData(ride, preferences, isAuth);
};

const ride = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);
  const preferences = (await getUserPreferences(req, res)) as Preferences;
  const { id } = req.query;
  const rideDetails = await getRide(id, preferences, isAuth);

  return res.status(200).json(rideDetails);
};

export default ride;
