// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { isAdmin } from "../auth/authHelpers";

export const removeRepeatingRide = async (id: string) => {
  try {
    const result = await prisma.repeatingRide.delete({
      where: { id },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

const deleteRide = async (req: NextApiRequest, res: NextApiResponse) => {
  const isAuth = await isAdmin(req, res);

  if (!isAuth) {
    return res.status(401).send({
      error: "Not authorised to use this API",
    });
  }

  try {
    const id = req.body;
    const success = await removeRepeatingRide(id);

    return res.status(200).json(success);
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: err,
    });
  }
};

export default deleteRide;
