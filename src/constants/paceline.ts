import { Ride } from "../types";

type PacelineStub = Omit<Ride, "day" | "date" | "time">;

const name = "Paceline";
const meetPoint =
  "Car Park of the Dental Implant Surgery on the corner of Newbridge Rd(A4) and Chelsea Rd (https://g.page/thedentalimplantclinicbath?share)";
const route = "https://ridewithgps.com/routes/31250554";
const distance = 70;

export const PACELINE_RIDES: PacelineStub[] = [
  {
    group: "UBER",
    speed: 39,
    notes: "Expected time: 1hr 45min - 1hr 50min",
  },
  {
    group: "FAST1",
    speed: 37,
    notes: "Expected time: 1hr 50min - 1hr 55min",
  },
  {
    group: "FAST2",
    speed: 35,
    notes: "Expected time: 2hr",
  },
  {
    group: "MEDIUM",
    speed: 33,
    notes: "Expected time: 2hr 5min",
  },
  {
    group: "MODS",
    speed: 30,
    notes: "Expected time: 2hr 15min",
  },
  {
    group: "ROCKERS",
    speed: 26,
  },
].map((ride) => ({ ...ride, name, meetPoint, distance, route }));
