import { NextApiRequest, NextApiResponse } from "next";
import { addRidesForDay } from "./ride/create-rides-for-day";
import { findNextDay } from "../../../shared/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;
      console.log(
        "🚀 ~ file: cron.ts ~ line 12 ~ authorization",
        authorization
      );

      if (authorization === `Bearer ${process.env.API_KEY}`) {
        // Get date for Saturday after next
        // (6 = Saturday; 7 = start search 7 days from now)
        const nextSaturday = findNextDay(6, 7);
        const saturdayResults = await addRidesForDay(nextSaturday);
        const nextSunday = findNextDay(0, 7);
        const sundayResults = await addRidesForDay(nextSunday);

        // More rides to follow
        res.status(200).json({
          success: true,
          saturdayResults,
          sundayResults,
        });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

/**
 * Test with the following curl command:

   curl --request POST \
     --url 'http://localhost:3000/api/cron' \
     --header 'Authorization: Bearer {API_KEY}'
 */
