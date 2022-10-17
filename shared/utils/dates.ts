import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Current local time
export const getNow = () => {
  const delta = dayjs().utcOffset();

  return dayjs().utc().add(delta, "minutes").toISOString();
};

// Set ISO time in db; no offset calculation
export const makeUtcDate = (day: string, time: string): string =>
  dayjs(`${day}T${time}:00.000Z`).utc().format();

export const getNextWeek = () => {
  const nextWeek = dayjs()
    .add(7, "day")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .toISOString();

  return nextWeek;
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
