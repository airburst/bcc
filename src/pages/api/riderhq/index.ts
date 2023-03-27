import { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../../env/server.mjs";
import { Member, MemberData, transformMember } from "./transformMember";

const { RIDERHQ_URL, RIDERHQ_ACCOUNT_ID, RIDERHQ_PRIVATE_KEY } = env;
const Authorization = `Basic ${Buffer.from(
  `${RIDERHQ_ACCOUNT_ID}:${RIDERHQ_PRIVATE_KEY}`,
  "utf8"
).toString("base64")}`;

type MembersResponse = {
  data: MemberData[];
  has_more_bool: boolean;
};

const fetchMembers = (startAfter?: string): Promise<MembersResponse> => {
  let query = `${RIDERHQ_URL}/api/v2/groups/grp_2ohch80/members?sort=lastname_txt,firstnames_txt`;

  if (startAfter) {
    query += `&starting_after_id=${startAfter}`;
  }

  return fetch(query, {
    headers: {
      Authorization,
    },
  }).then((data) => data.json());
};

const fetchAllMembers = async (
  members?: Member[],
  startAfter?: string
): Promise<Member[]> => {
  const results: MembersResponse = await fetchMembers(startAfter);
  // Add to collection
  const allMembers = [...(members || []), ...results.data.map(transformMember)];
  // Paginate
  if (results.has_more_bool) {
    const lastMemberId = results.data[results.data.length - 1]?.id;
    return fetchAllMembers(allMembers, lastMemberId);
  }
  return allMembers;
};

/**
 * This API is designed to be hit by a manual workflow in GitHub.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.API_KEY}`) {
        // eslint-disable-next-line camelcase
        const members: Member[] = await fetchAllMembers();

        // More rides to follow
        res.status(200).json({
          success: true,
          members,
        });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ statusCode: 500, message: err.message });
      }
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

/**
 * Test with the following curl command:

   curl --request POST \
     --url 'http://localhost:3000/api/riderhq' \
     --header 'Authorization: Bearer {API_KEY}'
 */
