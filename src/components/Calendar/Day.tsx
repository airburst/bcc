import Link from "next/link";
import { formatRideBadge, getNow, isReady } from "../../../shared/utils";
import { Ride } from "../../types";
import { RoundBadge, Badge } from "../Badge";

type Props = {
  day: number;
  date: string;
  past?: boolean;
  rides?: Ride[];
  classes?: string;
};

const getBadgeColour = (
  past: boolean | undefined,
  hasUnreadyRides: boolean | undefined
): string => {
  if (past) {
    return "bg-slate-500";
  }
  return hasUnreadyRides ? "bg-red-500" : "bg-teal-700";
};

// TODO: fix last-child borders
export const Day = ({ day, date, rides = [], classes, past }: Props) => {
  const today = getNow();
  const isToday = today.startsWith(date);
  const hasUnreadyRides = rides.filter((r) => !isReady(r)).length > 0;

  const cellStyle = isToday
    ? "bg-indigo-100 text-black hover:bg-blue-50 hover:text-neutral-900"
    : "hover:bg-blue-50 hover:text-neutral-900 cursor-pointer";

  const wrapperClasses =
    classes ||
    `lg:text-md h-[calc((100vh_-_48px)_/_6)] w-full mb-0 justify-self-center border-b-[1px] border-r-[1px] border-neutral-100 p-1 text-sm last:border-b-0 last:border-r-0 lg:h-[calc(100vh_/_7)] cursor-pointer overflow-hidden ${cellStyle}`;

  const Content = (
    <div className={wrapperClasses}>
      {day}

      <div className="flex justify-center py-2 sm:hidden lg:grid-cols-3 lg:gap-2">
        {rides && rides.length > 0 && (
          <RoundBadge
            text={rides.length}
            size="lg"
            color={getBadgeColour(past, hasUnreadyRides)}
          />
        )}
      </div>

      <div className="invisible grid grid-cols-2 gap-1 sm:visible lg:grid-cols-3 lg:gap-2">
        {rides &&
          rides.map((ride) => (
            <div key={ride.id} className="truncate">
              {isReady(ride) ? (
                <Badge
                  text={formatRideBadge(ride)}
                  size="xs"
                  color={getBadgeColour(past, false)}
                />
              ) : (
                <Badge
                  text={formatRideBadge(ride)}
                  size="xs"
                  color={getBadgeColour(past, true)}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );

  // Disable link for 'outside' days
  return <Link href={`/ride/planner/${date}`}>{Content}</Link>;
};

export const OutsideDay = (props: Props) => (
  <Day
    {...props}
    classes="lg:text-md h-[calc((100vh_-_48px)_/_6)]  w-full justify-self-center bg-neutral-50 p-1 text-sm text-neutral-400 lg:h-[calc(100vh_/_7)] cursor-pointer"
    past
  />
);
