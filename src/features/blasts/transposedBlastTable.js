import { createColumnHelper } from "@tanstack/react-table";
import { fieldLabels, isEditableField, isNumericField, visibleBlastFields } from "./blastFields";
import { formatCompactDate } from "../../utils/formatDate";

const columnHelper = createColumnHelper();

export function formatBlastValue(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  return value;
}

function formatFieldValue(field, value) {
  if (["date", "lastSyncedAt", "closedAt", "createdAt", "updatedAt"].includes(field)) {
    return formatCompactDate(value);
  }

  return formatBlastValue(value);
}

export function buildTransposedBlastRows(blasts, summariesByField = {}) {
  return visibleBlastFields.map((field) => {
    const numeric = isNumericField(field);
    const summary = summariesByField[field] ?? {};
    const row = {
      field,
      label: fieldLabels[field] ?? field,
      editable: isEditableField(field),
      numeric,
      summaryTotal: numeric ? (summary.total ?? "-") : "",
      summaryNotes: numeric ? (summary.notes ?? "-") : "",
    };

    blasts.forEach((blast, index) => {
      row[`blast_${index}`] = formatFieldValue(field, blast[field]);
    });

    return row;
  });
}

export function buildTransposedBlastColumns(blasts) {
  return [
    columnHelper.accessor("label", {
      id: "label",
      header: "Campo",
      cell: (info) => info.getValue(),
      size: 128,
      minSize: 80,
      maxSize: 260,
    }),
    ...blasts.map((blast, index) =>
      columnHelper.accessor(`blast_${index}`, {
        header: blast.blastCode || `Registro ${index + 1}`,
        cell: (info) => info.getValue(),
        size: 112,
        minSize: 72,
        maxSize: 260,
      }),
    ),
    columnHelper.accessor("summaryTotal", {
      header: "Total",
      cell: (info) => info.getValue(),
      size: 96,
      minSize: 72,
      maxSize: 180,
    }),
    columnHelper.accessor("summaryNotes", {
      header: "Notas",
      cell: (info) => info.getValue(),
      size: 208,
      minSize: 120,
      maxSize: 360,
    }),
  ];
}
