// src/pages/api/rides.ts
import { getRides } from "@drizzle/queries";
import type { NextApiRequest, NextApiResponse } from "next";
import { Preferences } from "../../types";
import { getUserPreferences, isLoggedIn } from "./auth/authHelpers";

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isLoggedIn(req, res);
  const preferences = (await getUserPreferences(req, res)) as Preferences;
  const { query } = req;
  const rideData = await getRides(query, preferences, isAuth);

  return res.status(200).json(rideData);
};

export default rides;
