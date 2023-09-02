import { User } from "@prisma/client";
import { DEFAULT_PREFERENCES } from "../../src/constants";
import { Preferences } from "../../src/types";

export const getPreferences = (user: User): Preferences => {
  const preferences = user.preferences as Preferences;

  return {
    ...DEFAULT_PREFERENCES,
    ...preferences,
  };
};
