/* eslint-disable no-console */
// src/pages/api/new-rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Ride } from "@prisma/client";
import { conn } from "../../server/db/planetscale";
import { formatRideDataV2, getQueryDateRange } from "../../../shared/utils";
import { getUserPreferences } from "./auth/authHelpers";
import { Preferences } from "../../types";

type RideType = Ride & {
  date: string;
  count: string;
  includesMe: string;
};

type QueryType = {
  start?: string;
  end?: string;
};

export const getRides = async (
  query: QueryType,
  preferences: Preferences | undefined,
  userId: string
) => {
  const { start, end } = getQueryDateRange(query);
  const params = { start, end, userId };
  const sql = `SELECT
    r.*,
    COALESCE(ur.cnt,0) as count,
    COALESCE(ur.me,false) as includesMe
  from Ride r
  LEFT OUTER JOIN (
    SELECT rideId, CAST(count(*) as UNSIGNED) cnt,
    CASE
      WHEN rideId IN (
        select rideId from UsersOnRides where userId = :userId
      ) THEN true
      ELSE false
    END as me
    FROM UsersOnRides
    GROUP BY rideId
  ) ur ON ur.rideId = r.id
  where date > :start
  and date < :end
  and deleted = false
  order by r.date;`;

  try {
    const rideData = await conn.execute(sql, params);

    return rideData.rows.map((row) =>
      formatRideDataV2(<RideType>row, preferences)
    );
  } catch (error) {
    console.error("getRides FAIL", error);
    return new Error("Unable to fetch rides");
  }
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const preferences = (await getUserPreferences(req, res)) as Preferences;
  const { query } = req;
  const rideData = await getRides(
    query,
    preferences,
    "cla4gyokx0000ju08ldmve5lv"
  );
  return res.status(200).json(rideData);
};

export default rides;

// export const config = {
//   runtime: "experimental-edge",
// };
