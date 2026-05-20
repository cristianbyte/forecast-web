import { Menu, Settings } from "lucide-react";

function StatusDot({ tone }) {
  const color = tone === "ok" ? "bg-[var(--color-ok)]" : "bg-[var(--color-danger)]";
  return <span className={`h-2 w-2 rounded-[var(--radius-pill)] ${color}`} />;
}

export function Topbar({ onMenuClick }) {
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
          <StatusDot tone="ok" />
          Conectado
        </span>
        <span>Estado: operativo</span>
        <span>Cambios guardados</span>
        <span>Sincronizado</span>
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
