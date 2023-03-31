import type { NextPage } from "next";
import Head from "next/head";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { useRides, useLocalStorage } from "../hooks";
import { RideGroup, RideGroupSkeleton, Filters } from "../components";
import {
  getNextWeek,
  groupRides,
  formatDate,
  makeFilterData,
  getDateInWeeks,
} from "../../shared/utils";
import { Preferences, User, AnonymousUser, FilterQuery } from "../types";
import { showFilterAtom, filterQueryAtom } from "../store";

const nextDate = getNextWeek();

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [rider] = useLocalStorage<AnonymousUser>("bcc-user", {});
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
          <title>BCC Rides</title>
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

  // Get user id from session
  const user = session?.user as User;
  if (user) {
    user.preferences = user?.preferences as Preferences;
    // Unset anonymous user if stored
    if (rider?.id) {
      window.localStorage.clear();
    }
  }

  const groupedRides = groupRides(data, filterQuery);
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
              <RideGroup key={Object.keys(group)[0]} group={group} />
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
