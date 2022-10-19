export * from "./dates";
export * from "./isMobile";
export * from "./paceline";
export * from "./rides";
export * from "./transformRideData";

export const flattenQuery = (param?: string[] | string | undefined): string => {
  const makeString = (s?: string): string => s || "";

  return Array.isArray(param) ? makeString(param[0]) : makeString(param);
};
