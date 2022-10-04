// src/pages/api/add-rider-to-ride.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

type Props = {
  rideId: string;
  userId: string;
};

export const addRiderToRide = async ({ rideId, userId }: Props) => {
  const result = await prisma.usersOnRides.create({ data: { rideId, userId } });

  return result;
};

// TODO: Secure route
// Only a user or admin can add/remove themselves from a ride
const addRider = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);
  const { rideId, userId } = req.body;
  const success = await addRiderToRide({ rideId, userId });
  console.log('🚀 ~ file: add-rider-to-ride.ts ~ line 35 ~ addRider ~ success', success); // FIXME:
  res.status(200).json(success);
};

export default addRider;
