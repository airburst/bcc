import { getNextMonth } from "@utils/dates";
import { NextApiRequest, NextApiResponse } from "next";
import { makeRidesInPeriod } from "@utils/repeatingRides";
import { RepeatingRideDb } from "src/types";
import { prisma } from "../../../server/db/client";

// TODO: Update comments
/**
 * This API is designed to be hit by a scheduled workflow
 * in GitHub.  The cron schedule is for the first of each month
 * and the default is to generate all rides for the following month.
 * You can override that by passing a date in the POST body.
 */
type BodyProps = {
  date?: string;
  scheduleId?: string;
};

// TODO: Handle date period
export const getTemplates = async ({ scheduleId }: BodyProps) => {
  // If we have an id, find one match, else return all templates
  const rideRecords: RepeatingRideDb[] = await prisma.repeatingRide.findMany({
    orderBy: { name: "asc" },
    where: { id: scheduleId },
  });

  if (!rideRecords) {
    return [];
  }

  // For each template, get a list rides to create
  const rides = rideRecords.flatMap((r) => makeRidesInPeriod(r));

  return rides;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { date, scheduleId }: BodyProps = req.body;

    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_KEY}`) {
        const targetMonth = date || getNextMonth();

        const templates = await getTemplates({ scheduleId });

        res.status(200).json({
          success: true,
          targetMonth,
          scheduleId,
          templates,
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
     --url 'http://localhost:3000/api/repeating-ride/generate' \
     --header 'Authorization: Bearer {API_KEY}'
 */
