import { useCallback, useState } from "react";

export const USER_PREFERENCE_KEYS = {
  blastTableColumnSizing: "blast-table-column-sizing",
  selectedPeriod: "selected-period",
};

const STORAGE_KEY_PREFIX = "forecast";

function getPreferenceStorageKey(preferenceKey, scope) {
  return [STORAGE_KEY_PREFIX, preferenceKey, scope].filter(Boolean).join(":");
}

function getDefaultPreferenceValue(defaultValue) {
  return typeof defaultValue === "function" ? defaultValue() : defaultValue;
}

export function readUserPreference(preferenceKey, defaultValue, scope) {
  try {
    const storedPreference = localStorage.getItem(getPreferenceStorageKey(preferenceKey, scope));

    if (!storedPreference) {
      return getDefaultPreferenceValue(defaultValue);
    }

    return JSON.parse(storedPreference);
  } catch {
    return getDefaultPreferenceValue(defaultValue);
  }
}

export function writeUserPreference(preferenceKey, preferenceValue, scope) {
  try {
    localStorage.setItem(
      getPreferenceStorageKey(preferenceKey, scope),
      JSON.stringify(preferenceValue),
    );
  } catch {
    // Keep the UI usable if localStorage is unavailable or full.
  }
}

export function useUserPreference(preferenceKey, defaultValue, scope) {
  const [preferenceState, setPreferenceState] = useState(() => ({
    preferenceKey,
    scope,
    preferenceValue: readUserPreference(preferenceKey, defaultValue, scope),
  }));
  const preferenceValue =
    preferenceState.preferenceKey === preferenceKey && preferenceState.scope === scope
      ? preferenceState.preferenceValue
      : readUserPreference(preferenceKey, defaultValue, scope);

  const updatePreferenceValue = useCallback(
    (preferenceUpdater) => {
      setPreferenceState((currentPreferenceState) => {
        const currentPreferenceValue =
          currentPreferenceState.preferenceKey === preferenceKey && currentPreferenceState.scope === scope
            ? currentPreferenceState.preferenceValue
            : readUserPreference(preferenceKey, defaultValue, scope);
        const nextPreferenceValue =
          typeof preferenceUpdater === "function"
            ? preferenceUpdater(currentPreferenceValue)
            : preferenceUpdater;

        writeUserPreference(preferenceKey, nextPreferenceValue, scope);

        return { preferenceKey, scope, preferenceValue: nextPreferenceValue };
      });
    },
    [defaultValue, preferenceKey, scope],
  );

  return [preferenceValue, updatePreferenceValue];
}
