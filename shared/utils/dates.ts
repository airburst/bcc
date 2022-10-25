import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Current local time
export const getNow = () => {
  const delta = dayjs().utcOffset();

  return dayjs().utc().add(delta, "minutes").toISOString();
};

export const getDateFromString = (dateString: string, end?: boolean) => {
  const delta = dayjs().utcOffset();

  return end
    ? dayjs(dateString)
        .utc()

        .toISOString()
    : dayjs(dateString).utc().add(delta, "minutes").toISOString();
};

// Set ISO time in db; no offset calculation
export const makeUtcDate = (day: string, time: string): string =>
  dayjs(`${day}T${time}:00.000Z`).utc().format();

export const getNextWeek = () => {
  const nextWeek = dayjs().add(7, "day").toISOString();

  return nextWeek;
};

// Get next Day of Week
export const findNextDay = (day = 6, startInDays = 0) => {
  const today = dayjs().day();

  let delta = day - today;
  if (delta <= 0) {
    delta += 7;
  }

  delta += startInDays;
  return dayjs().add(delta, "day").toISOString();
};

export const getQueryDateRange = ({
  start,
  end,
}: {
  start?: string;
  end?: string;
}) => {
  const now = getNow();
  const st = start ? getDateFromString(start) : now;
  let en = end ? getDateFromString(end, true) : getNextWeek();

  // Set end of day on en
  en = dayjs(en)
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .toISOString();

  return { start: st, end: en };
};

export const isSaturday = (date: string) => dayjs(date).day() === 6;

export const getMonthDateRange = (date: string) => {
  // Extract month and year from date
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;
  const formattedMonth = month.toString().padStart(2, "0");
  const start = `${year}-${formattedMonth}-01`;
  const end = `${year}-${formattedMonth}-${dayjs(date).daysInMonth()}`;

  return { start, end };
};

export const formatDate = (date: string) =>
  dayjs(date).utc().format("dddd DD MMMM");

export const formatCalendarDate = (date: string) =>
  dayjs(date).utc().format("MMMM YYYY");

export const formatTime = (date: string) => dayjs(date).utc().format("HH:mm");

export const formatFormDate = (date: string) =>
  dayjs(date).utc().format("YYYY-MM-DD");

export const getRideDateAndTime = (date: string) => ({
  day: formatDate(date),
  time: formatTime(date),
});

// Formatted for form inputs:
// date = "yyyy-mm-dd" and time = "hh:mm"
export const getFormRideDateAndTime = (date: string) => ({
  date: formatFormDate(date),
  time: formatTime(date),
});

// Calendar view helpers
export const getMonth = () => dayjs().month();

export const getLastMonth = (date?: string) =>
  dayjs(date).subtract(31, "day").toISOString();

export const getNextMonth = (date?: string) =>
  dayjs(date).add(31, "day").toISOString();

export const firstDayOfMonth = (date?: string) =>
  date ? dayjs(date).startOf("month").day() : dayjs().startOf("month").day();

export const daysInMonth = (date?: string) =>
  date ? dayjs(date).daysInMonth() : dayjs().daysInMonth();

// Winter is 01 Dec - end Feb
export const isWinter = (date: string): boolean => {
  const month = dayjs(date).month();

  return month > 10 || month < 3;
};
