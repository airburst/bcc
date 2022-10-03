// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const rides = async (req: NextApiRequest, res: NextApiResponse) => {
  const rides = await prisma.ride.findMany();
  res.status(200).json(rides);
};

export default rides;
