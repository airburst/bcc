const { PrismaClient } = require("@prisma/client");
const dayjs = require("dayjs");

const prisma = new PrismaClient();

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

// Get next Day of Week
const findNextDay = (day = 6) => {
  const today = dayjs().day();

  let delta = day - today;
  if (delta <= 0) {
    delta += 7;
  }

  return dayjs().add(delta, "day");
};

// Does start time change for Winter (1 Nov - 28 Feb)?
const getNextPaceline = () => {
  const firstRide = findNextDay(6) // Saturday
    .set("hour", 8)
    .set("minute", 40)
    .set("second", 0);
  // Calculate utc offset
  const offset = dayjs().utcOffset();
  return firstRide.add(offset, "minute").toISOString();
};

const nextDate = getNextPaceline();

const generateRides = () =>
  rides.map((ride, index) => {
    const minutes = dayjs(nextDate).minute();
    const date = dayjs(nextDate)
      .set("minute", minutes + index)
      .toISOString();
    return {
      name: "Paceline",
      route: "https://ridewithgps.com/routes/31250554",
      ...ride,
      date,
    };
  });

// Long PL (110kms non stop https://ridewithgps.com/routes/34458338)
// Normal Paceline https://ridewithgps.com/routes/31250554

const load = async () => {
  try {
    // Add paceline data for next week
    await prisma.ride.createMany({
      data: generateRides(),
    });

    console.log("Added Paceline data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
