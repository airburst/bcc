// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isLoggedIn, isLeader, getUserPreferences } from "../auth/authHelpers";
import { convertToKms } from "../../../../shared/utils";
import { Ride, Preferences } from "../../../types";

export const addRide = async (ride: Ride) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: We don't send users in request
  const result = await prisma.ride.create({ data: ride });
  return result;
};

// Only a logged-in user can join a ride
const createRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can create a ride.",
    });
  }

  try {
    const ride = req.body;
    // Cast limit to number
    ride.limit = +ride.limit || -1;
    // A user can only add themselves; a leader can add other riders
    const hasLeaderRole = await isLeader(req, res);

    if (hasLeaderRole) {
      // Convert to kms if necessary
      const preferences = (await getUserPreferences(req, res)) as Preferences;

      if (preferences.units === "miles") {
        ride.distance = convertToKms(ride.distance);
      }

      const success = await addRide(ride);
      return res.status(200).json(success);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};

export default createRide;
