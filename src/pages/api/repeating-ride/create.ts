// src/pages/api/add-rider-to-ride.ts
import { getUserPreferences, isAdmin, isLoggedIn } from "@auth/authHelpers";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertToKms, repeatingRideToDb } from "../../../../shared/utils";
import { prisma } from "../../../server/db/client";
import { Preferences, RepeatingRideDb } from "../../../types";

export const addRepeatingRide = async (ride: RepeatingRideDb) => {
  const result = await prisma.repeatingRide.create({ data: ride });
  return result;
};

// Only a logged-in user can join a ride
const createRepeatingRide = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const isAuth = await isLoggedIn();

  if (!isAuth) {
    return res.status(401).send({
      error: "Only a leader can create a ride.",
    });
  }

  try {
    const ride = repeatingRideToDb(req.body);

    // Cast limit to number
    ride.limit = +(ride.limit || -1);

    const hasAdminRole = await isAdmin();

    if (hasAdminRole) {
      // Convert to kms if necessary
      const preferences = (await getUserPreferences()) as Preferences;

      if (ride.distance && preferences.units === "miles") {
        ride.distance = convertToKms(ride.distance);
      }

      const success = await addRepeatingRide(ride);
      return res.status(200).json(success);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("🚀 ~ ", err);
    // Could send actual error!
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};

export default createRepeatingRide;
