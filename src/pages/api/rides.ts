// src/pages/api/new-rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Ride } from "@prisma/client";
import { conn } from "../../server/db/planetscale";
import { formatRideDataV2, getQueryDateRange } from "../../../shared/utils";
import { getUser } from "./auth/authHelpers";
import { Preferences } from "../../types";
import { DEFAULT_PREFERENCES } from "../../constants";

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
  userId?: string
) => {
  const { start, end } = getQueryDateRange(query);
  const params = { start, end, userId: userId || "" };
  const sql = `SELECT
    r.id,
    r.name,
    r.group,
    r.distance,
    r.destination,
    r.date,
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
      formatRideDataV2(<RideType>row, preferences || DEFAULT_PREFERENCES)
    );
  } catch (error) {
    return new Error("Unable to fetch rides");
  }
};

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUser(req, res);
  const { query } = req;
  const rideData = await getRides(query, user?.preferences, user?.id);
  return res.status(200).json(rideData);
};

export default rides;
