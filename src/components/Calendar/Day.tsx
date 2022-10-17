import Skeleton from "react-loading-skeleton";
import { formatRideBadge } from "../../../shared/utils";
import { Ride } from "../../types";
import { Badge } from "../Badge";

type Props = {
  day: number;
  rides?: Ride[];
  loading?: boolean;
};

// TODO: fix last-child borders
export const Day = ({ day, rides, loading }: Props) => (
  <div className="lg:text-md h-24 w-full justify-self-center border-b-[1px] border-r-[1px] border-neutral-100 p-1 text-sm last:border-b-0 last:border-r-0 hover:bg-blue-50 hover:text-neutral-900 lg:h-24">
    <div>
      {day}
      {loading && <Skeleton />}
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 lg:gap-2">
        {rides &&
          rides.map((ride) => (
            <div key={ride.id} className="truncate">
              <Badge text={formatRideBadge(ride)} />
            </div>
          ))}
      </div>
    </div>
  </div>
);

export const OutsideDay = ({ day, rides, loading }: Props) => (
  <div className="lg:text-md h-24 w-full justify-self-center bg-neutral-50 p-1 text-sm text-neutral-400 lg:h-24">
    <div>
      {day}
      {loading && <Skeleton />}
      <div className="grid grid-cols-2 gap-1 lg:grid-cols-3 lg:gap-2">
        {rides &&
          rides.map((ride) => (
            <div key={ride.id} className="truncate">
              <Badge text={formatRideBadge(ride)} />
            </div>
          ))}
      </div>
    </div>
  </div>
);
