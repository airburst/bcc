import Skeleton from "react-loading-skeleton";

type Props = {
  day: number;
  loading: boolean;
};

// TODO: fix last-child borders
export const Day = ({ day, loading }: Props) => (
  <div className="h-20 w-full justify-self-center border-b-[1px] border-r-[1px] border-neutral-100 p-2 text-sm last:border-b-0 last:border-r-0 hover:bg-blue-50 hover:text-neutral-900 lg:h-24 lg:text-lg">
    <div>
      {day}
      {loading && <Skeleton />}
    </div>
  </div>
);

export const OutsideDay = ({ day, loading }: Props) => (
  <div className="h-20 w-full justify-self-center bg-neutral-50 p-2 text-sm text-neutral-400 lg:h-24 lg:text-lg">
    <div>
      {day}
      {loading && <Skeleton />}
    </div>
  </div>
);
