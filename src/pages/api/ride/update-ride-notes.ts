// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { getRide } from "./index";

export const changeRideNote = async (
  rideId: string,
  userId: string,
  notes: string
) => {
  const newNotes = notes === "" ? null : notes;
  try {
    await prisma.usersOnRides.updateMany({
      data: { notes: newNotes },
      where: { AND: [{ userId }, { rideId }] },
    });
    // Refetch ride
    const ride = await getRide(rideId, undefined);
    return ride;
  } catch (err) {
    return { error: err };
  }
};

// Only a logged-in user can join a ride
const updateRideNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { rideId, userId, notes } = req.body;

    if (rideId && userId) {
      const success = await changeRideNote(rideId, userId, notes);
      return res.status(200).json(success);
    }
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: err,
    });
  }
};

export default updateRideNotes;
