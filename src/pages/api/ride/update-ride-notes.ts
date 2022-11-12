// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isMe } from "../auth/authHelpers";
import { getRide } from "./index";

export const changeRideNote = async (
  rideId: string,
  userId: string,
  notes: string
) => {
  try {
    await prisma.usersOnRides.updateMany({
      data: { notes },
      where: { AND: [{ userId }, { rideId }] },
    });
    // Refetch ride
    const ride = await getRide(rideId);
    return ride;
  } catch (err) {
    return { error: err };
  }
};

// Only a logged-in user can join a ride
const updateRideNotes = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { rideId, userId, notes } = req.body;
    // A user can only add themselves; a leader can add other riders
    const isMyRecord = await isMe(req, res)(userId);

    if (isMyRecord && notes) {
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
