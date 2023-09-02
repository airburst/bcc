import type { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "../../pages/api/auth/[...nextauth]";

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
  // eslint-disable-next-line no-return-await
}) => await getServerSession(ctx.req, ctx.res, nextAuthOptions);
