import { createColumnHelper } from "@tanstack/react-table";
import { fieldLabels, isEditableField, visibleBlastFields } from "./blastFields";

const columnHelper = createColumnHelper();

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
}

export const blastColumns = visibleBlastFields.map((field) =>
  columnHelper.accessor(field, {
    header: fieldLabels[field] ?? field,
    cell: (info) => {
      const value = formatValue(info.getValue());
      const editable = isEditableField(field);

      return <span className={editable ? "text-[var(--color-primary)]" : ""}>{value}</span>;
    },
  }),
);
