import { USER_PREFERENCE_KEYS, useUserPreference } from "../../utils/userPreferences";

export function useBlastTableColumnSizing() {
  return useUserPreference(
    USER_PREFERENCE_KEYS.blastTableColumnSizing,
    {},
  );
}
