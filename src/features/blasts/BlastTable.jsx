import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { blastColumns } from "./blastColumns";

export function BlastTable({ data, filter, onFilterChange }) {
  // TanStack Table intentionally returns function-heavy instances; React Compiler warns but this is expected.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: blastColumns,
    state: { globalFilter: filter },
    onGlobalFilterChange: onFilterChange,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)]">
      <div className="flex items-center justify-between border-b border-[var(--border-default)] px-4 py-3">
        <div>
          <h2 className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
            Registro de voladuras
          </h2>
        </div>
        <input
          className="w-72 rounded-[var(--radius-input)] border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-2 text-[13px] font-medium text-[var(--text-primary)] outline-none focus:border-[var(--color-primary)]"
          placeholder="Filtrar registros"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full min-w-[3800px] border-collapse text-left">
          <thead className="sticky top-0 bg-[var(--surface-app)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-[var(--border-default)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-faint)]"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-[var(--surface-hover)]">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b border-[var(--border-subtle)] px-4 py-2.5 text-[12px] font-medium text-[var(--text-primary)]"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {table.getRowModel().rows.length === 0 ? (
          <div className="px-4 py-10 text-center text-[12px] font-medium text-[var(--text-muted)]">
            No hay registros para mostrar.
          </div>
        ) : null}
      </div>
    </section>
  );
}
