import { HeadingGroup } from "./Heading";
import { Day, OutsideDay } from "./Day";
import {
  firstDayOfMonth,
  daysInMonth,
  getLastMonth,
} from "../../../shared/utils";
import { Ride } from "../../types";

type Props = {
  date?: string;
  rides?: Ride[];
  loading: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Calendar: React.FC<Props> = ({ rides, loading, date }: Props) => {
  const startDay = firstDayOfMonth(date);
  const lastDay = daysInMonth(date);

  const calGrid = [];

  // If first day > 0 (Sunday) we need to include days from end of previous month
  if (startDay > 0) {
    const endOfLastMonth = daysInMonth(getLastMonth(date));
    for (let pd = 0; pd < startDay; pd += 1) {
      calGrid.push({
        type: "outside",
        day: endOfLastMonth - startDay + pd + 1,
      });
    }
  }

  // Add all of the days in month
  for (let d = 1; d < lastDay + 1; d += 1) {
    calGrid.push({ day: d });
  }

  // Fill up final week with next month
  const remainder = calGrid.length % 7;

  if (remainder > 0) {
    for (let nd = 1; nd < 8 - remainder; nd += 1) {
      calGrid.push({
        type: "outside",
        day: nd,
      });
    }
  }

  return (
    <div className="m-2 grid grid-cols-7 gap-0 rounded bg-white shadow-md lg:m-0">
      <HeadingGroup />
      {calGrid.map(({ type, day }) =>
        type === "outside" ? (
          <OutsideDay key={`${type}-${day}`} day={day} loading={loading} />
        ) : (
          <Day key={`cal-${day}`} day={day} loading={loading} />
        )
      )}
    </div>
  );
};
