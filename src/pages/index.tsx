import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import { getRides } from "./api/rides";
import { RideGroup } from "../components";
import { getNextWeek, groupRides, formatDate } from "../../shared/utils";
import { User, Ride } from "../types";

type Props = {
  data: Ride[];
};

const nextDate = getNextWeek();

export const fetchRides = async () => {
  const res = await fetch("/api/rides");
  const data = await res.json();
  return data;
};

const Home: NextPage<Props> = ({ data }: Props) => {
  const { data: session } = useSession();

  // Get user id from session
  const user = session?.user as User;
  const groupedRides = groupRides(data);
  const ridesFound = groupedRides.length > 0;

  return (
    <>
      <Head>
        <title>BCC Rides</title>
        <meta name="description" content="Bath Cycling Club Ride Planner" />
      </Head>

      <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
        {ridesFound ? (
          <>
            {groupedRides.map((group) => (
              <RideGroup
                key={Object.keys(group)[0]}
                group={group}
                user={user}
              />
            ))}
          </>
        ) : (
          <div className="flex h-full items-center text-3xl">
            No planned rides before {formatDate(nextDate)}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const session = await getSession();
  const data = await getRides(!!session);

  return {
    props: {
      data,
    },
  };
};
