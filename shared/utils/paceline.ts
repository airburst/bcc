import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const rides = [
  {
    group: "UBER",
    distance: 70,
    speed: 39,
    // notes: "Expected time: 1hr 45min - 1hr 50min"
  },
  {
    group: "FAST1",
    distance: 70,
    speed: 37,
    // notes: "Expected time: 1hr 50min - 1hr 55min"
  },
  {
    group: "FAST2",
    distance: 70,
    speed: 35,
    // notes: "Expected time: 2hr"
  },
  {
    group: "MEDIUM",
    distance: 70,
    speed: 33,
    // notes: "Expected time: 2hr 5min"
  },
  {
    group: "MODS",
    distance: 70,
    speed: 30,
    // notes: "Expected time: 2hr 15min"
  },
  {
    group: "ROCKERS",
    distance: 70,
    speed: 26,
  },
];

// Does start time change for Winter (1 Nov - 28 Feb)?
export const getNextPaceline = (date: string) => {
  const firstRide = dayjs(date) // Saturday
    .set("hour", 8)
    .set("minute", 40)
    .set("second", 0);
  // Calculate utc offset
  const offset = dayjs().utcOffset();
  return firstRide.add(offset, "minute").toISOString();
};

export const generateRides = (date: string) => {
  const nextDate = getNextPaceline(date);

  return rides.map((ride, index) => {
    const minutes = dayjs(nextDate).minute();
    const dateTime = dayjs(nextDate)
      .set("minute", minutes + index)
      .toISOString();
    return {
      name: "Paceline",
      route: "https://ridewithgps.com/routes/31250554",
      ...ride,
      date: dateTime,
    };
  });
};
