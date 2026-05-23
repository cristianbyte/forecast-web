import { Menu, Settings, Wifi, WifiOff } from "lucide-react";
import { useConnectionStatus } from "../utils/useConnectionStatus";
import {
  getCurrentPeriod,
  getPeriodParts,
  getYearOptions,
  MONTH_OPTIONS,
} from "../utils/period";
import {
  USER_PREFERENCE_KEYS,
  useUserPreference,
} from "../utils/userPreferences";

function StatusDot({ isOnline }) {
  const Icon = isOnline ? Wifi : WifiOff;
  const color = isOnline
    ? "text-[var(--color-ok)]"
    : "text-[var(--color-danger)]";

  return <Icon className={color} size={14} />;
}

export function Topbar({ onMenuClick }) {
  const isOnline = useConnectionStatus();
  const [selectedPeriod, setSelectedPeriod] = useUserPreference(
    USER_PREFERENCE_KEYS.selectedPeriod,
    getCurrentPeriod,
  );
  const { year: selectedYear, month: selectedMonth } =
    getPeriodParts(selectedPeriod);
  const yearOptions = getYearOptions(selectedYear);

  function updateSelectedYear(year) {
    setSelectedPeriod(`${year}-${selectedMonth}`);
  }

  function updateSelectedMonth(month) {
    setSelectedPeriod(`${selectedYear}-${month}`);
  }

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
      <div className="mr-auto ml-3 flex items-center gap-2">
        <select
          className="h-8 rounded-[var(--radius-input)] border border-[var(--border-default)] bg-[var(--surface-card)] px-3 text-[12px] font-bold uppercase tracking-wide text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30"
          value={selectedYear}
          onChange={(event) => updateSelectedYear(event.target.value)}
          aria-label="Año del periodo"
        >
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
        <select
          className="h-8 rounded-[var(--radius-input)] border border-[var(--border-default)] bg-[var(--surface-card)] px-3 text-[12px] font-bold uppercase tracking-wide text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/30"
          value={selectedMonth}
          onChange={(event) => updateSelectedMonth(event.target.value)}
          aria-label="Mes del periodo"
        >
          {MONTH_OPTIONS.map((monthOption) => (
            <option key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </option>
          ))}
        </select>
      </div>

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
