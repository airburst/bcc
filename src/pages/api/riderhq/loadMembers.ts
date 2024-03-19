import { prisma } from "../../../server/db/client";
import { Member } from "./convertMembers";

export const loadMembers = async (members: Member[]) => {
  // Clean existing table
  await prisma.membership.deleteMany();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const result = await prisma.membership.createMany({ data: members });

  return result;
};
