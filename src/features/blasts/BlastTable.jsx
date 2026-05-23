import { useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  buildTransposedBlastColumns,
  buildTransposedBlastRows,
} from "./transposedBlastTable";

const EMPTY_SUMMARIES = {};

export function BlastTable({
  data,
  filter,
  onFilterChange,
  summariesByField = EMPTY_SUMMARIES,
}) {
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [columnSizing, setColumnSizing] = useState({});
  const rows = useMemo(
    () => buildTransposedBlastRows(data, summariesByField),
    [data, summariesByField],
  );
  const columns = useMemo(() => buildTransposedBlastColumns(data), [data]);

  // TanStack Table intentionally returns function-heavy instances; React Compiler warns but this is expected.
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: rows,
    columns,
    state: { globalFilter: filter, columnSizing },
    onGlobalFilterChange: onFilterChange,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const visibleRows = table.getRowModel().rows;

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
          placeholder="Filtrar campos o valores"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
        />
      </div>
      <div className="min-h-0 flex-1 overflow-auto">
        <table
          className="min-w-full table-fixed border-collapse text-left"
          style={{ width: table.getTotalSize() }}
        >
          <colgroup>
            {table.getAllLeafColumns().map((column) => (
              <col key={column.id} style={{ width: column.getSize() }} />
            ))}
          </colgroup>
          <thead className="sticky top-0 z-20 bg-[var(--surface-app)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    className={`relative select-none whitespace-nowrap border-b border-[var(--border-default)] px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-faint)] ${
                      index === 0
                        ? "w-px border-r bg-[var(--surface-app)]"
                        : "bg-[var(--surface-app)]"
                    }`}
                    style={{
                      width: header.getSize(),
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {header.column.getCanResize() ? (
                      <button
                        className={`absolute right-0 top-0 z-40 h-full w-2 cursor-col-resize touch-none border-r border-transparent hover:border-[var(--color-primary)] ${
                          header.column.getIsResizing()
                            ? "border-[var(--color-primary)] bg-[var(--color-primary-dim)]"
                            : "bg-transparent"
                        }`}
                        type="button"
                        aria-label="Cambiar ancho de columna"
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr
                key={row.id}
                className={
                  hoveredRowId === row.id ? "bg-[var(--surface-hover)]" : ""
                }
                onMouseEnter={() => setHoveredRowId(row.id)}
                onMouseLeave={() => setHoveredRowId(null)}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`h-[38px] whitespace-nowrap border-b border-[var(--border-subtle)] px-3 py-2.5 font-medium ${
                      index === 0
                        ? "w-px border-r text-[10px] font-bold uppercase tracking-wider text-[var(--text-faint)]"
                        : row.original.editable &&
                            !cell.column.id.startsWith("summary")
                          ? "text-[12px] text-[var(--color-primary)]"
                          : "text-[12px] text-[var(--text-primary)]"
                    }`}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 || visibleRows.length === 0 ? (
          <div className="px-4 py-10 text-center text-[12px] font-medium text-[var(--text-muted)]">
            No hay registros para mostrar.
          </div>
        ) : null}
      </div>
    </section>
  );
}
