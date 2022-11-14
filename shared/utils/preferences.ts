import { User } from "@prisma/client";
import { Preferences } from "../../src/types";
import { DEFAULT_PREFERENCES } from "../../src/constants";

export const getPreferences = (user: User): Preferences => {
  const preferences = user.preferences as Preferences;

  return {
    ...DEFAULT_PREFERENCES,
    ...preferences,
  };
};
