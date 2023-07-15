import { makeRepeatingRide } from "./forms";

const ride = {
  name: "xxx",
  group: "Used to be fast",
  limit: -1,
  date: "2023-07-25",
  time: "08:30",
  meetPoint: "Brunel Square",
  distance: 123,
  destination: "Somewhere",
  route: "https://link-to-ride",
  leader: "Mark Fairhurst",
  notes: "Some info",
};

const weeklyRide = {
  ...ride,
  bymonthday: 25,
  byweekday: 1,
  winterStartTime: "08:30",
  interval: 1,
  freq: 2,
  startDate: "2023-07-25",
  endDate: "",
};

const monthlyByDay = {
  ...ride,
  byweekday: 1,
  winterStartTime: "09:30",
  interval: 1,
  freq: 1,
  startDate: "2023-07-25",
  endDate: "2023-12-31",
  bymonthday: 25,
  bymonth: 7,
};

const monthlyByWeek = {
  ...ride,
  byweekday: 1,
  winterStartTime: "09:30",
  byweekno: -1,
  interval: 1,
  freq: 1,
  startDate: "2023-07-01",
  endDate: "2023-12-31",
};

describe("Forms utility functions", () => {
  describe("Repeating ride forms", () => {
    it("passes through all ride details to repeating payload", () => {
      expect(makeRepeatingRide(weeklyRide)).toEqual({
        name: "xxx",
        group: "Used to be fast",
        date: "2023-07-25",
        time: "08:30",
        meetPoint: "Brunel Square",
        distance: 123,
        destination: "Somewhere",
        route: "https://link-to-ride",
        leader: "Mark Fairhurst",
        notes: "Some info",
        limit: -1,
        winterStartTime: "08:30",
        schedule:
          "DTSTART:20230725T000000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU",
      });
    });

    it("correctly transforms a weekly repeating ride payload", () => {
      expect(makeRepeatingRide(weeklyRide).schedule).toEqual(
        "DTSTART:20230725T000000Z\nRRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=TU"
      );
    });

    it("correctly transforms a monthly repeating ride (by day) payload", () => {
      expect(makeRepeatingRide(monthlyByDay).schedule).toEqual(
        "DTSTART:20230725T000000Z\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYMONTH=7;BYMONTHDAY=25;UNTIL=20231231T000000Z"
      );
    });

    it("correctly transforms a monthly repeating ride (by week) payload", () => {
      expect(makeRepeatingRide(monthlyByWeek).schedule).toEqual(
        "DTSTART:20230701T000000Z\nRRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=TU;BYWEEKNO=-1;UNTIL=20231231T000000Z"
      );
    });
  });
});
