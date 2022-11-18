import type { NextPage } from "next";
import Error from "next/error";
import { useRides } from "../../hooks";
import { RideGroup, RideGroupSkeleton } from "../../components";
import { getNextWeek, groupRides, formatDate } from "../../../shared/utils";

const nextDate = getNextWeek();

const Embed: NextPage = () => {
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

  const groupedRides = groupRides(data);
  const ridesFound = groupedRides.length > 0;

  return (
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
  );
};

export default Embed;
