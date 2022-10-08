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

// // dayjs.utc('2020-04-22T14:56:09.388842'.substring(0, 23))

export const formatDate = (date: string) => dayjs(date).format("dddd DD MMMM");
export const formatTime = (date: string) => dayjs(date).format("HH:mm");

export const getRideDateAndTime = (date: string) => {
  return {
    day: formatDate(date),
    time: formatTime(date)
  };
};
