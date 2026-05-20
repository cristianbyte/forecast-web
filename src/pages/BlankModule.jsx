export function BlankModule({ title }) {
  return (
    <section className="flex h-full flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] p-6">
      <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-primary)]">Modulo</p>
      <h1 className="mt-2 text-[18px] font-bold uppercase tracking-wide text-[var(--text-primary)]">
        {title}
      </h1>
      <div className="mt-6 flex flex-1 items-center justify-center border border-dashed border-[var(--border-default)] text-[12px] font-medium text-[var(--text-muted)]">
        Vista pendiente de definir.
      </div>
    </section>
  );
}
