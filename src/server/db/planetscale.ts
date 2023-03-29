// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from "@planetscale/database";
import { env } from "../../env/server.mjs";

const config = {
  host: env.DATABASE_HOST,
  username: env.DATABASE_USERNAME,
  password: env.DATABASE_PASSWORD,
};

export const conn = connect(config);
