import type { NextPage } from "next";
import Head from "next/head";
import Error from "next/error";
import { useState } from "react";
import { useRides } from "../../../hooks";
import { Button, Calendar } from "../../../components";
import {
  getNow,
  getLastMonth,
  getNextMonth,
  formatCalendarDate,
  getMonthDateRange,
} from "../../../../shared/utils";

const RideCalendar: NextPage = () => {
  const [date, setDate] = useState<string>(getNow());
  const { start, end } = getMonthDateRange(date);
  // Fetch rides for month selected
  const { data, loading, error } = useRides(start, end);

  const goToNextMonth = () => setDate(getNextMonth(date));

  const goToLastMonth = () => setDate(getLastMonth(date));

  if (error) {
    return <Error statusCode={500} />;
  }

  return (
    <>
      <Head>
        <title>BCC Rides - Calendar</title>
        <meta name="description" content="Bath Cycling Club Ride Calendar" />
      </Head>

      <div className="grid w-full grid-cols-1 gap-0 md:gap-8">
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full flex-row items-center justify-between bg-blue-900 p-2 font-bold uppercase tracking-wider text-white sm:rounded">
            <Button onClick={goToLastMonth}>
              <span>&lt;</span>
            </Button>
            <span>{formatCalendarDate(date)}</span>
            <Button onClick={goToNextMonth}>
              <span>&gt;</span>
            </Button>
          </div>
        </div>

        <Calendar date={date} rides={data} loading={loading} />
      </div>
    </>
  );
};

export default RideCalendar;
