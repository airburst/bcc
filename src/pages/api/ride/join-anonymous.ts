// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { addRiderToRide } from "./join";

const joinRideAnonymously = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { rideId, userId } = req.body;
    const success = await addRiderToRide({ rideId, userId });
    return res.status(200).json(success);
  } catch (err) {
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }
};

export default joinRideAnonymously;
