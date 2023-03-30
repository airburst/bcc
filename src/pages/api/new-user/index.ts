// src/pages/api/rides.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../server/db/planetscale";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { isMe, isAdmin } from "../auth/authHelpers";
import { formatUser } from "../../../../shared/utils";
import { User } from "../../../types";

export const getProfile = async (user: User) => {
  const sql = `select * from User where id = :id;`;
  const { rows } = await conn.execute(sql, user);

  if (!rows || rows.length === 0) {
    return {};
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Need to add type safety to queries
  return formatUser(rows[0], null, true);
};

const profile = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authorised" });
  }

  const isMyRecord = await isMe(req, res)(session.user.id);
  const hasLeaderRole = await isAdmin(req, res);

  if (isMyRecord || hasLeaderRole) {
    const userData = await getProfile(session.user as User);
    return res.status(200).json(userData);
  }
  return res.status(401).send({
    error: "Not authorised to use this API",
  });
};

export default profile;
