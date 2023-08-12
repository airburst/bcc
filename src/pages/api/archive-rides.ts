import { NextApiRequest, NextApiResponse } from "next";
import { getNow } from "../../../shared/utils";
import { archiveRides } from "./ride/archive-rides";

/**
 * This API is designed to be hit by a scheduled workflow
 * in GitHub.  The cron schedule is for the first of each month
 * and the default is to generate all rides for the following month.
 * You can override that by passing a date in the POST body.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date } = req.body;

    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_KEY}`) {
        const runDate = date ? new Date(date).toISOString() : getNow();

        const archiveResults = await archiveRides(runDate);

        // More rides to follow
        res.status(200).json({
          success: true,
          runDate,
          archiveResults,
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
     --url 'http://localhost:3000/api/archive-rides' \
     --header 'Authorization: Bearer {API_KEY}'
 */
