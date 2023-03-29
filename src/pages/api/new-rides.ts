// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../server/db/planetscale";
// import { formatRideData, getQueryDateRange } from "../../../shared/utils";
// import { isLoggedIn, getUserPreferences } from "./auth/authHelpers";
// import { Preferences } from "../../types";

// type QueryType = {
//   start?: string;
//   end?: string;
// };

// export const getRides = async (
//   query: QueryType,
//   preferences: Preferences | undefined,
//   isAuth = false
// ) => {
//   const { start, end } = getQueryDateRange(query);

//   const rides = await prisma.ride.findMany({
//     where: {
//       AND: [
//         {
//           date: {
//             gte: start,
//             lte: end,
//           },
//           deleted: false,
//         },
//       ],
//     },
//     include: {
//       users: {
//         include: { user: true },
//       },
//     },
//     orderBy: [
//       {
//         date: "asc",
//       },
//     ],
//   });

//   return rides.map((ride) => formatRideData(ride, preferences, isAuth));
// };

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  // const isAuth = await isLoggedIn(req, res);
  // const preferences = (await getUserPreferences(req, res)) as Preferences;
  // const { query } = req;
  // const rideData = await getRides(query, preferences, isAuth);
  // return res.status(200).json(rideData);
  const query = `select *
 from Ride
 where date > '2023-03-29 00:00'
 and deleted = false
 order by date
 limit 10;`;
  const rideData = await conn.execute(query);

  return res.status(200).json(rideData.rows);
};

export default rides;

// export const config = {
//   runtime: "experimental-edge",
// };
