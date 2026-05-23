import { useCallback, useState } from "react";

const STORAGE_KEY_PREFIX = "forecast:blast-table-column-sizing";

function getStorageKey(location) {
  return `${STORAGE_KEY_PREFIX}:${location}`;
}

function readStoredColumnSizing(location) {
  try {
    const storedColumnSizing = localStorage.getItem(getStorageKey(location));

    if (!storedColumnSizing) {
      return {};
    }

    const parsedColumnSizing = JSON.parse(storedColumnSizing);

    return typeof parsedColumnSizing === "object" && parsedColumnSizing !== null
      ? parsedColumnSizing
      : {};
  } catch {
    return {};
  }
}

function writeStoredColumnSizing(location, columnSizing) {
  try {
    localStorage.setItem(getStorageKey(location), JSON.stringify(columnSizing));
  } catch {
    // Ignore storage failures so table resizing keeps working in restricted browsers.
  }
}

export function useBlastTableColumnSizing(location) {
  const [columnSizingState, setColumnSizingState] = useState(() => ({
    location,
    columnSizing: readStoredColumnSizing(location),
  }));
  const columnSizing =
    columnSizingState.location === location
      ? columnSizingState.columnSizing
      : readStoredColumnSizing(location);

  const updateColumnSizing = useCallback(
    (columnSizingUpdater) => {
      setColumnSizingState((currentColumnSizingState) => {
        const currentColumnSizing =
          currentColumnSizingState.location === location
            ? currentColumnSizingState.columnSizing
            : readStoredColumnSizing(location);
        const nextColumnSizing =
          typeof columnSizingUpdater === "function"
            ? columnSizingUpdater(currentColumnSizing)
            : columnSizingUpdater;

        writeStoredColumnSizing(location, nextColumnSizing);

        return { location, columnSizing: nextColumnSizing };
      });
    },
    [location],
  );

  return [columnSizing, updateColumnSizing];
}
