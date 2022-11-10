import { PartialRide, SeasonStartTime } from "../../types";
import { DAYS } from "../days";

const WEDNESDAY_START_TIME: SeasonStartTime = {
  summer: {
    hour: 9,
    minute: 15,
  },
  winter: {
    hour: 9,
    minute: 15,
  },
};

const name = "Wednesday Social";
const meetPoint = "TBA";
const notes =
  "This ride is aimed at Expresso/Americano riders so an average of between 24km/hr and 26km/hr depending on the route and weather.  We ride together and tend to use smaller roads than the Sunday rides.  We normally get back to Bath in mid afternoon. ";

const RIDES: PartialRide[] = [
  {
    distance: 100,
  },
].map((ride) => ({
  name,
  meetPoint,
  leader: "David Oliver",
  notes,
  ...ride,
}));

export const WEDNESDAY_RIDES = {
  day: DAYS.WEDNESDAY,
  rides: RIDES,
  startTime: WEDNESDAY_START_TIME,
};
