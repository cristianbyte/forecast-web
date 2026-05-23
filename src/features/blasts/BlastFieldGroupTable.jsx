import { useMemo } from "react";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { fieldLabels, isNumericField } from "./blastFields";
import { formatCompactDate } from "../../utils/formatDate";

const FIELD_COLUMN_WIDTH = 190;
const BLAST_COLUMN_WIDTH = 132;
const TOTAL_COLUMN_WIDTH = 132;
const NOTES_COLUMN_WIDTH = 260;
const DATE_FIELDS = new Set([
  "date",
  "lastSyncedAt",
  "closedAt",
  "createdAt",
  "updatedAt",
]);

function getBlastColumnId(blast, index) {
  return `blast-${blast.id ?? blast.blastCode ?? index}`;
}

function getBlastFieldValue(blast, field) {
  if (field === "subLocation") {
    return blast.subLocation;
  }

  return blast[field];
}

function formatCellValue(value) {
  if (value == null || value === "") {
    return "-";
  }

  if (typeof value === "number") {
    return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 2 }).format(
      value,
    );
  }

  return String(value);
}

function formatBlastFieldValue(field, value) {
  if (DATE_FIELDS.has(field)) {
    return formatCompactDate(value);
  }

  return formatCellValue(value);
}

function getSummaryValue(summary, field) {
  return (
    summary?.total ??
    summary?.[`total${field[0]?.toUpperCase() ?? ""}${field.slice(1)}`] ??
    null
  );
}

function buildTableRows(fieldGroup, blasts, getFieldSummary) {
  return fieldGroup.fields.map((field) => {
    const blastValues = Object.fromEntries(
      blasts.map((blast, index) => [
        getBlastColumnId(blast, index),
        getBlastFieldValue(blast, field),
      ]),
    );
    const firstPeriod = blasts.find((blast) => blast.period)?.period;
    const summary = firstPeriod ? getFieldSummary(firstPeriod, field) : null;

    return {
      field,
      fieldLabel: fieldLabels[field] ?? field,
      blastValues,
      total: getSummaryValue(summary, field),
      notes: summary?.notes ?? "",
    };
  });
}

function buildTableColumns(blasts) {
  const blastColumns = blasts.map((blast, index) => {
    const columnId = getBlastColumnId(blast, index);

    return {
      id: columnId,
      accessorFn: (row) => row.blastValues[columnId],
      size: BLAST_COLUMN_WIDTH,
      minSize: 88,
      maxSize: 260,
    };
  });

  return [
    {
      id: "fieldLabel",
      accessorKey: "fieldLabel",
      size: FIELD_COLUMN_WIDTH,
      minSize: 150,
      maxSize: 320,
    },
    ...blastColumns,
    {
      id: "total",
      accessorKey: "total",
      size: TOTAL_COLUMN_WIDTH,
      minSize: 96,
      maxSize: 220,
    },
    {
      id: "notes",
      accessorKey: "notes",
      size: NOTES_COLUMN_WIDTH,
      minSize: NOTES_COLUMN_WIDTH,
      maxSize: NOTES_COLUMN_WIDTH,
      enableResizing: false,
    },
  ];
}

function getCellClassName(cell) {
  const isFieldLabel = cell.column.id === "fieldLabel";
  const isNotes = cell.column.id === "notes";
  const isNumeric =
    cell.column.id === "total" || isNumericField(cell.row.original.field);

  if (isFieldLabel) {
    return "sticky left-0 z-10 border-r border-[var(--border-default)] bg-[var(--surface-app)] text-left text-[11px] font-bold uppercase tracking-wide text-[var(--text-muted)]";
  }

  if (isNotes) {
    return "text-left text-[11px] font-medium text-[var(--text-muted)]";
  }

  return isNumeric
    ? "text-right text-[12px] font-bold"
    : "text-left text-[12px] font-medium";
}

export function BlastFieldGroupTable({
  fieldGroup,
  blasts,
  columnSizing,
  getFieldSummary,
  isCollapsed,
  onColumnSizingChange,
  onToggleCollapse,
}) {
  const tableRows = useMemo(
    () => buildTableRows(fieldGroup, blasts, getFieldSummary),
    [fieldGroup, blasts, getFieldSummary],
  );
  const tableColumns = useMemo(() => buildTableColumns(blasts), [blasts]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: tableRows,
    columns: tableColumns,
    state: { columnSizing },
    onColumnSizingChange,
    columnResizeMode: "onChange",
    getCoreRowModel: getCoreRowModel(),
  });
  const headerByColumnId = Object.fromEntries(
    table.getFlatHeaders().map((header) => [header.column.id, header]),
  );

  return (
    <section className="w-max min-w-full">
      <button
        className={`${isCollapsed ? "mb-0 bg-[var(--surface-hover)]" : "mb-1 bg-[var(--surface-app)]"} flex w-full items-center gap-2 rounded-[var(--radius-input)] px-2 py-1 text-left text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)] hover:bg-[var(--surface-hover)]`}
        type="button"
        onClick={onToggleCollapse}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
        {fieldGroup.title}
      </button>

      {isCollapsed ? null : (
        <table
          className="border-separate border-spacing-0 overflow-visible rounded-[var(--radius-input)] border border-[var(--border-subtle)] bg-[var(--surface-card)]"
          style={{ tableLayout: "fixed", width: table.getCenterTotalSize() }}
        >
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="bg-[var(--surface-card)] hover:bg-[var(--surface-hover)]"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => {
                  const header = headerByColumnId[cell.column.id];
                  const isNotes = cell.column.id === "notes";

                  return (
                    <td
                      className={`relative border-r border-b border-[var(--border-subtle)] px-4 py-2.5 align-top text-[var(--text-primary)] last:border-r-0 ${getCellClassName(cell)}`}
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                    >
                      <div
                        className={
                          isNotes
                            ? "max-h-10 overflow-y-auto overflow-x-hidden whitespace-normal break-words [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                            : "whitespace-nowrap"
                        }
                      >
                        {formatBlastFieldValue(
                          cell.row.original.field,
                          cell.getValue(),
                        )}
                      </div>

                      {header?.column.getCanResize() ? (
                        <button
                          aria-label="Cambiar ancho de columna"
                          className="absolute right-0 top-0 h-full w-1 cursor-col-resize touch-none bg-transparent hover:bg-[var(--color-primary)]"
                          type="button"
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                        />
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
