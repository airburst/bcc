import { HeadingGroup } from "./Heading";
import { Day, OutsideDay } from "./Day";
import {
  firstDayOfMonth,
  daysInMonth,
  getLastMonth,
  getNextMonth,
  mapRidesToDate,
} from "../../../shared/utils";
import { Ride } from "../../types";

type Props = {
  date: string;
  rides?: Ride[];
  loading: boolean;
};

const getDateStub = (date: string) => {
  const parts = date.split("-");
  return `${parts[0]}-${parts[1]}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Calendar: React.FC<Props> = ({ rides, loading, date }: Props) => {
  const startDay = firstDayOfMonth(date);
  const lastDay = daysInMonth(date);

  const calGrid = [];

  // If first day > 0 (Sunday) we need to include days from end of previous month
  if (startDay > 0) {
    const lastMonth = getLastMonth(date);
    const endOfLastMonth = daysInMonth(lastMonth);
    for (let pd = 0; pd < startDay; pd += 1) {
      const day = endOfLastMonth - startDay + pd + 1;
      calGrid.push({
        type: "outside",
        day,
        date: `${getDateStub(lastMonth)}-${day.toString().padStart(2, "0")}`,
      });
    }
  }

  // Add all of the days in month
  for (let d = 1; d < lastDay + 1; d += 1) {
    calGrid.push({
      type: "inside",
      day: d,
      date: `${getDateStub(date)}-${d.toString().padStart(2, "0")}`,
    });
  }

  // Fill up final week with next month
  const remainder = calGrid.length % 7;

  if (remainder > 0) {
    const nextMonth = getNextMonth(date);
    for (let nd = 1; nd < 8 - remainder; nd += 1) {
      calGrid.push({
        type: "outside",
        day: nd,
        date: `${getDateStub(nextMonth)}-${nd.toString().padStart(2, "0")}`,
      });
    }
  }

  // Match rides to dates
  const daysWithRides = calGrid.map((dt) => ({
    ...dt,
    rides: mapRidesToDate(rides || [], dt.date),
  }));

  return loading ? (
    <div className="m-2 grid grid-cols-7 gap-0 rounded bg-white shadow-md lg:m-0">
      <HeadingGroup />
      {calGrid.map(({ type, day }) =>
        type === "outside" ? (
          <OutsideDay key={`${type}-${day}`} day={day} loading />
        ) : (
          <Day key={`cal-${day}`} day={day} loading />
        )
      )}
    </div>
  ) : (
    <div className="m-2 grid grid-cols-7 gap-0 rounded bg-white shadow-md lg:m-0">
      <HeadingGroup />
      {daysWithRides.map(({ type, day, rides: mappedRides }) =>
        type === "outside" ? (
          <OutsideDay key={`${type}-${day}`} day={day} rides={mappedRides} />
        ) : (
          <Day key={`cal-${day}`} day={day} rides={mappedRides} />
        )
      )}
    </div>
  );
};
