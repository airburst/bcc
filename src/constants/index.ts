export * from "./days";
export * from "./preferences";
export * from "./rides/friday";
export * from "./rides/sundayRides";
export * from "./rides/tuesday";
export * from "./rides/wednesday";
export * from "./rides/wednesday-hills";

// [5 .. 50] rider limit bounds
export const RIDER_LIMIT_OPTIONS: number[] = Array.from(Array(45).keys()).map(
  (x) => x + 5
);
