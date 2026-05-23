import { NavLink } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Landmark,
  MapPinned,
  Scale,
} from "lucide-react";

const navigation = [
  { to: "/voladuras/hs", label: "Voladura HS", icon: MapPinned },
  { to: "/voladuras/hn", label: "Voladura HN", icon: MapPinned },
  { to: "/conciliaciones", label: "Conciliaciones", icon: Scale },
  { to: "/balances", label: "Balances", icon: Landmark },
  { to: "/acpm", label: "ACPM", icon: Fuel },
];

export function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`flex h-screen shrink-0 flex-col border-r border-[var(--border-default)] bg-[var(--surface-card)] transition-all duration-200 ${
        collapsed ? "w-12" : "w-56"
      }`}
    >
      <div className="flex h-12 items-center gap-2 border-b border-[var(--border-default)] px-3">
        <BarChart3 className="shrink-0 text-[var(--color-primary)]" size={18} />
        {collapsed ? null : (
          <span className="text-[12px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
            Forecast
          </span>
        )}
      </div>{" "}
      <nav className="flex flex-1 flex-col gap-1 px-2 py-3">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              className={({ isActive }) =>
                `flex h-9 items-center gap-3 rounded-[var(--radius-input)] border-r-2 px-2 text-[12px] font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-dim)] text-[var(--color-primary)]"
                    : "border-transparent text-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                }`
              }
              key={item.to}
              title={collapsed ? item.label : undefined}
              to={item.to}
            >
              <Icon className="shrink-0" size={16} />
              {collapsed ? null : (
                <span className="truncate">{item.label}</span>
              )}
            </NavLink>
          );
        })}
      </nav>
      <button
        className="flex h-11 items-center justify-center border-t border-[var(--border-subtle)] text-[var(--text-faint)] hover:text-[var(--text-primary)]"
        type="button"
        onClick={onToggle}
        title={collapsed ? "Expandir menu" : "Colapsar menu"}
      >
        {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
      </button>
    </aside>
  );
}
