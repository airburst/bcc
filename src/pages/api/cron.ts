import { NextApiRequest, NextApiResponse } from "next";
import { addPacelineRides } from "./ride/create-paceline";

// TODO: calculate date for next PL Saturday

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_KEY}`) {
        // Create Paceline rides on Saturday
        const results = await addPacelineRides("2022-10-08");
        // More rides to follow
        res.status(200).json({ success: true, results });
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
