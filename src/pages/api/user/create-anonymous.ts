// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import { prisma } from "../../../server/db/client";
import { User } from "../../../types";

export const addAnonymousUser = async (user: User) => {
  const { id, name, mobile, emergency } = user;

  try {
    const result = await prisma.user.create({
      data: {
        id: id || nanoid(),
        name,
        mobile,
        emergency,
        role: "ANONYMOUS",
      },
    });
    return result;
  } catch (err) {
    return { error: err };
  }
};

const createAnonymousUser = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = req.body;
    const userData = await addAnonymousUser(user);

    return res.status(200).json(userData);
  } catch (err) {
    // Could send actual error!
    return res.status(401).send({
      error: err,
    });
  }
};

export default createAnonymousUser;
