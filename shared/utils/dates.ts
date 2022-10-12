import dayjs from "dayjs";

export const getNextWeek = () => {
  const nextWeek = dayjs()
    .add(7, "day")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .toISOString();

  return nextWeek;
};

export const formatDate = (date: string) => dayjs(date).format("dddd DD MMMM");
export const formatTime = (date: string) => dayjs(date).format("HH:mm");
export const formatFormDate = (date: string) => {
  const offset = dayjs(date).utcOffset();
  console.log({ offset }); // FIXME:

  return dayjs(date).format("YYYY-MM-DD");
};

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
export const makeUtcDate = (day: string, time: string): string => {
  const dt = dayjs(`${day}T${time}:00.000Z`);
  const offset = dt.utcOffset();
  return dt.add(-offset, "minutes").toISOString();
};

// // dayjs.utc('2020-04-22T14:56:09.388842'.substring(0, 23))
