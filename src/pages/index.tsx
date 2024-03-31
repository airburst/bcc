import { authOptions } from "@api/auth/[...nextauth]";
import { useAtom } from "jotai";
import type { GetServerSideProps, NextPage } from "next";
import { getServerSession } from "next-auth";
import Error from "next/error";
import Head from "next/head";
import { useEffect } from "react";
import {
  formatDate,
  getDateInWeeks,
  getNextWeek,
  groupRides,
  makeFilterData,
  serialiseUser,
} from "../../shared/utils";
import { Filters, RideGroup, RideGroupSkeleton } from "../components";
import { env } from "../env/client.mjs";
import { useLocalStorage, useRides } from "../hooks";
import { filterQueryAtom, showFilterAtom } from "../store";
import { FilterQuery, User } from "../types";

const { NEXT_PUBLIC_CLUB_SHORT_NAME, NEXT_PUBLIC_CLUB_LONG_NAME } = env;

type Props = {
  user: User;
};

const nextDate = getNextWeek();

const Home: NextPage<Props> = ({ user }: Props) => {
  const [filters] = useLocalStorage<FilterQuery>("bcc-filters", {});
  // Get reactive data from atom
  const [showFilterMenu, setShowFilterMenu] = useAtom(showFilterAtom);
  const [filterQuery, setFilterQuery] = useAtom(filterQueryAtom);

  // Fetch rides for next 2 weeks
  const { data, loading, error } = useRides(
    undefined,
    getDateInWeeks(filterQuery.weeksAhead || "2")
  );

  useEffect(() => {
    setFilterQuery(filters);
  }, [filters, setFilterQuery]);

  const closeFilters = () => setShowFilterMenu(false);
  // Skeleton while loading
  if (loading) {
    return (
      <>
        <Head>
          <title>{`${NEXT_PUBLIC_CLUB_SHORT_NAME} Rides`}</title>
          <meta name="description" content="Bath Cycling Club Ride Planner" />
        </Head>
        <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
          <RideGroupSkeleton
            numberOfCards={5}
            dateText="SATURDAY 10 NOWONDER"
          />
          <RideGroupSkeleton numberOfCards={5} />
        </div>
      </>
    );
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  const groupedRides = groupRides(data, filterQuery, user);
  const ridesFound = groupedRides.length > 0;

  return (
    <>
      <Head>
        <title>{`${NEXT_PUBLIC_CLUB_SHORT_NAME} Rides`}</title>
        <meta
          name="description"
          content={`${NEXT_PUBLIC_CLUB_LONG_NAME} Ride Planner`}
        />
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
          <div className="flex h-full items-center p-8 pt-32 text-2xl">
            No planned rides before {formatDate(nextDate)}
          </div>
        )}
      </div>

      <Filters
        data={makeFilterData(data)}
        isShowing={showFilterMenu}
        closeHandler={closeFilters}
      />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore session user complains
  const user = serialiseUser(session?.user);

  return {
    props: {
      user,
    },
  };
};
