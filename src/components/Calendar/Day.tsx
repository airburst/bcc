import { formatRideBadge, getNow } from "../../../shared/utils";
import { Ride } from "../../types";
import { RoundBadge, Badge } from "../Badge";

type Props = {
  day: number;
  date: string;
  rides?: Ride[];
  classes?: string;
};

// TODO: fix last-child borders
export const Day = ({ day, date, rides, classes }: Props) => {
  const today = getNow();
  const isToday = today.startsWith(date);
  const cellStyle = isToday
    ? "bg-blue-700 text-white hover:bg-blue-50 hover:text-neutral-900"
    : "hover:bg-blue-50 hover:text-neutral-900";

  const wrapperClasses =
    classes ||
    `lg:text-md h-24 w-full justify-self-center border-b-[1px] border-r-[1px] border-neutral-100 p-1 text-sm last:border-b-0 last:border-r-0 lg:h-24 ${cellStyle}`;

  return (
    <div className={wrapperClasses}>
      <div>
        {day}

        <div className="flex justify-center py-2 sm:hidden lg:grid-cols-3 lg:gap-2">
          {rides && rides.length > 0 && (
            <RoundBadge text={rides.length} size="lg" />
          )}
        </div>

        <div className="invisible grid grid-cols-2 gap-1 sm:visible lg:grid-cols-3 lg:gap-2">
          {rides &&
            rides.map((ride) => (
              <div key={ride.id} className="truncate">
                <Badge text={formatRideBadge(ride)} size="xs" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const OutsideDay = (props: Props) => (
  <Day
    {...props}
    classes="lg:text-md h-24 w-full justify-self-center bg-neutral-50 p-1 text-sm text-neutral-400 lg:h-24"
  />
);
