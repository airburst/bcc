import type { NextPage } from "next";
import Head from "next/head";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSWRConfig } from "swr";
import { useState } from "react";
import { useRides, addRidesForDay } from "../../../hooks";
import {
  BackButton,
  Button,
  RideGroup,
  RideGroupSkeleton,
} from "../../../components";
import {
  groupRides,
  formatDate,
  flattenQuery,
  isSaturday,
  getNow,
} from "../../../../shared/utils";
import { User, Ride } from "../../../types";

const Rides: NextPage = () => {
  const [creatingPL, setCreatingPL] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    query: { date },
  } = router;
  const dateString = `${flattenQuery(date)}T01:00:00.000Z`;
  const isInFuture = dateString > getNow();

  const { mutate } = useSWRConfig();

  const handleAddRides = () => {
    setCreatingPL(true);
    mutate(`/api/rides?start=${date}&end=${date}`, async () => {
      const results = await addRidesForDay(dateString);
      if (results?.count) {
        router.push("/ride/planner");
      }
      setCreatingPL(false);
    });
  };

  // Fetch rides for given date
  const { data, loading, error } = useRides(date, date);

  // Check for any existing PL rides
  const hasPaceline =
    data?.filter((ride: Ride) => ride?.name === "Paceline").length > 0;
  // TODO: generic for sunday too
  const showPacelineButton =
    isInFuture && isSaturday(dateString) && !hasPaceline;

  // Skeleton while loading
  if (loading) {
    return (
      <>
        <Head>
          <title>BCC Rides on {date}</title>
          <meta name="description" content="Bath Cycling Club Ride Planner" />
        </Head>
        <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
          <RideGroupSkeleton
            numberOfCards={5}
            dateText={formatDate(dateString)}
          />
        </div>
      </>
    );
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  // Get user id from session
  const user = session?.user as User;
  const groupedRides = groupRides(data);
  const ridesFound = groupedRides.length > 0;

  return (
    <>
      <Head>
        <title>BCC Rides on {date}</title>
        <meta name="description" content="Bath Cycling Club Ride Planner" />
      </Head>

      <div className="flex w-full flex-col gap-2 md:gap-4">
        <div className="flex h-10 flex-row justify-center gap-4">
          <BackButton />
          {isInFuture && (
            <Link href={`/ride/new?date=${date}`}>
              <Button>
                <div>
                  <i className="fa-solid fa-plus" />
                  <span>&nbsp;Add Ride</span>
                </div>
              </Button>
            </Link>
          )}
        </div>
        {showPacelineButton && (
          <div className="flex h-10 flex-row justify-center gap-4">
            <Button variant="red" loading={creatingPL} onClick={handleAddRides}>
              <div>
                <i className="fa-solid fa-plus" />
                <span>&nbsp;Add ALL Rides for day</span>
              </div>
            </Button>
          </div>
        )}

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
          <>
            <div className="flex w-full justify-center bg-blue-900 p-2 font-bold uppercase tracking-widest text-white">
              <div>{formatDate(dateString)}</div>
            </div>
            <div className="flex h-32 w-full items-center justify-center text-4xl">
              No planned rides
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Rides;
