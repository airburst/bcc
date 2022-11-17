import type { NextPage } from "next";
import Error from "next/error";
import { useSession } from "next-auth/react";
import { useRides, useLocalStorage } from "../hooks";
import { RideGroup, RideGroupSkeleton } from "../components";
import { getNextWeek, groupRides, formatDate } from "../../shared/utils";
import { Preferences, User, AnonymousUser } from "../types";

const nextDate = getNextWeek();

const Embed: NextPage = () => {
  const { data: session } = useSession();
  const [rider] = useLocalStorage<AnonymousUser>("bcc-user", {});
  // Fetch rides for next 2 weeks
  const { data, loading, error } = useRides();

  // Skeleton while loading
  if (loading) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
        <RideGroupSkeleton numberOfCards={5} dateText="SATURDAY 10 NOWONDER" />
        <RideGroupSkeleton numberOfCards={5} />
      </div>
    );
  }

  if (error) {
    return <Error statusCode={500} />;
  }

  // Get user id from session
  const user = session?.user as User;
  if (user) {
    user.preferences = session?.preferences as Preferences;
    // Unset anonymous user if stored
    if (rider?.id) {
      window.localStorage.clear();
    }
  }

  const groupedRides = groupRides(data);
  const ridesFound = groupedRides.length > 0;

  return (
    <div className="grid w-full grid-cols-1 gap-4 md:gap-8">
      {ridesFound ? (
        <>
          {groupedRides.map((group) => (
            <RideGroup key={Object.keys(group)[0]} group={group} user={user} />
          ))}
        </>
      ) : (
        <div className="flex h-full items-center text-3xl">
          No planned rides before {formatDate(nextDate)}
        </div>
      )}
    </div>
  );
};

export default Embed;
