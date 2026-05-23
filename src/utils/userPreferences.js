import { useCallback, useEffect, useState } from "react";

export const USER_PREFERENCE_KEYS = {
  blastTableColumnSizing: "blast-table-column-sizing",
  selectedPeriod: "selected-period",
};

const STORAGE_KEY_PREFIX = "forecast";
const USER_PREFERENCE_CHANGE_EVENT = "forecast:user-preference-change";

function getPreferenceStorageKey(preferenceKey, scope) {
  return [STORAGE_KEY_PREFIX, preferenceKey, scope].filter(Boolean).join(":");
}

function isSamePreference(preferenceDetail, preferenceKey, scope) {
  return preferenceDetail?.preferenceKey === preferenceKey && preferenceDetail?.scope === scope;
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

  window.dispatchEvent(
    new CustomEvent(USER_PREFERENCE_CHANGE_EVENT, {
      detail: { preferenceKey, preferenceValue, scope },
    }),
  );
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

  useEffect(() => {
    function updatePreferenceFromEvent(event) {
      if (!isSamePreference(event.detail, preferenceKey, scope)) {
        return;
      }

      setPreferenceState({
        preferenceKey,
        scope,
        preferenceValue: event.detail.preferenceValue,
      });
    }

    function updatePreferenceFromStorage(event) {
      if (event.key !== getPreferenceStorageKey(preferenceKey, scope)) {
        return;
      }

      setPreferenceState({
        preferenceKey,
        scope,
        preferenceValue: readUserPreference(preferenceKey, defaultValue, scope),
      });
    }

    window.addEventListener(USER_PREFERENCE_CHANGE_EVENT, updatePreferenceFromEvent);
    window.addEventListener("storage", updatePreferenceFromStorage);

    return () => {
      window.removeEventListener(USER_PREFERENCE_CHANGE_EVENT, updatePreferenceFromEvent);
      window.removeEventListener("storage", updatePreferenceFromStorage);
    };
  }, [defaultValue, preferenceKey, scope]);

  return [preferenceValue, updatePreferenceValue];
}
