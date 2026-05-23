import { useEffect, useState } from "react";

function getCurrentConnectionStatus() {
  return navigator.onLine;
}

export function useConnectionStatus() {
  const [isOnline, setIsOnline] = useState(getCurrentConnectionStatus);

  useEffect(() => {
    function updateConnectionStatus() {
      setIsOnline(getCurrentConnectionStatus());
    }

    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    return () => {
      window.removeEventListener("online", updateConnectionStatus);
      window.removeEventListener("offline", updateConnectionStatus);
    };
  }, []);

  return isOnline;
}
