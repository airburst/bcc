import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Current local time
export const getNow = () => {
  const delta = dayjs().utcOffset();

  return dayjs().utc().add(delta, "minutes").toISOString();
};

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

// Set ISO time in db; no offset calculation
export const makeUtcDate = (day: string, time: string): string =>
  dayjs(`${day}T${time}:00.000Z`).utc().format();
