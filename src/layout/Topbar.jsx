import { useEffect, useState } from "react";
import { Menu, Settings, Wifi, WifiOff } from "lucide-react";

function getCurrentConnectionStatus() {
  return navigator.onLine;
}

function StatusDot({ isOnline }) {
  const Icon = isOnline ? Wifi : WifiOff;
  const color = isOnline
    ? "text-[var(--color-ok)]"
    : "text-[var(--color-danger)]";

  return <Icon className={color} size={14} />;
}

export function Topbar({ onMenuClick }) {
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

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-card)] px-4">
      <button
        className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
        type="button"
        onClick={onMenuClick}
        title="Alternar menu"
      >
        <Menu size={17} />
      </button>

      <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-2">
          <StatusDot isOnline={isOnline} />
        </span>
        <button
          className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-input)] text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          type="button"
          title="Sesion"
        >
          <Settings size={16} />
        </button>
      </div>
    </header>
  );
}
