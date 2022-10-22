import { Ride } from "../types";

type PacelineStub = Omit<Ride, "day" | "date" | "time">;

export const PACELINE_RIDES: PacelineStub[] = [
  {
    name: "Paceline",
    group: "UBER",
    distance: 70,
    speed: 39,
    route: "https://ridewithgps.com/routes/31250554",
    notes: "Expected time: 1hr 45min - 1hr 50min",
  },
  {
    name: "Paceline",
    group: "FAST1",
    distance: 70,
    speed: 37,
    route: "https://ridewithgps.com/routes/31250554",
    notes: "Expected time: 1hr 50min - 1hr 55min",
  },
  {
    name: "Paceline",
    group: "FAST2",
    distance: 70,
    speed: 35,
    route: "https://ridewithgps.com/routes/31250554",
    notes: "Expected time: 2hr",
  },
  {
    name: "Paceline",
    group: "MEDIUM",
    distance: 70,
    speed: 33,
    route: "https://ridewithgps.com/routes/31250554",
    notes: "Expected time: 2hr 5min",
  },
  {
    name: "Paceline",
    group: "MODS",
    distance: 70,
    speed: 30,
    route: "https://ridewithgps.com/routes/31250554",
    notes: "Expected time: 2hr 15min",
  },
  {
    name: "Paceline",
    group: "ROCKERS",
    distance: 70,
    speed: 26,
    route: "https://ridewithgps.com/routes/31250554",
  },
];
