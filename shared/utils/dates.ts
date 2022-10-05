import dayjs from "dayjs";

export const getNextWeek = () => {
  const nextWeek = dayjs()
    .add(7, "day")
    .set("hour", 23)
    .set("minute", 59)
    .set("second", 59)
    .toISOString();

  return nextWeek;
  // return "2022-10-09T23:59:59.000Z";
};

export const formatDate = (date: string) => dayjs(date).format("dddd DD MMMM");
