import { useCallback, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { blastFieldGroups } from "./blastFieldGroups";
import { BlastFieldGroupTable } from "./BlastFieldGroupTable";
import { useBlastTableColumnSizing } from "./useBlastTableColumnSizing";
import { getBlastPeriodFieldSummaries } from "../../services/blastApi";

const EMPTY_SUMMARIES = [];

function getUniquePeriods(blasts) {
  return Array.from(
    new Set(
      blasts
        .map((blast) => blast.period)
        .filter((period) => period != null && period !== ""),
    ),
  );
}

function getSummaryKey(period, field) {
  return `${period}::${field}`;
}

function buildSummaryMap(periodFieldSummaries) {
  return new Map(
    periodFieldSummaries
      .filter((summary) => summary?.period && summary?.field)
      .map((summary) => [
        getSummaryKey(summary.period, summary.field),
        summary,
      ]),
  );
}

function getFieldSummary(summaryMap, period, field) {
  return summaryMap.get(getSummaryKey(period, field)) ?? null;
}

export function BlastGroupedTables({ blasts, location }) {
  const [columnSizing, setColumnSizing] = useBlastTableColumnSizing(location);
  const [collapsedGroupIds, setCollapsedGroupIds] = useState({});
  const periods = useMemo(() => getUniquePeriods(blasts), [blasts]);

  const summariesQuery = useQuery({
    queryKey: ["blast-period-field-summaries", location, periods],
    queryFn: () => getBlastPeriodFieldSummaries(location, periods),
    enabled: periods.length > 0,
  });

  const summaryMap = useMemo(
    () => buildSummaryMap(summariesQuery.data ?? EMPTY_SUMMARIES),
    [summariesQuery.data],
  );
  const findFieldSummary = useCallback(
    (period, field) => getFieldSummary(summaryMap, period, field),
    [summaryMap],
  );
  const toggleFieldGroup = useCallback((fieldGroupId) => {
    setCollapsedGroupIds((currentCollapsedGroupIds) => ({
      ...currentCollapsedGroupIds,
      [fieldGroupId]: !currentCollapsedGroupIds[fieldGroupId],
    }));
  }, []);

  if (blasts.length === 0) {
    return (
      <section className="flex min-h-0 flex-1 items-center justify-center rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-8 text-[12px] font-medium text-[var(--text-muted)]">
        No hay registros para mostrar.
      </section>
    );
  }

  return (
    <section className="min-h-0 flex-1 overflow-auto rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--surface-card)]">
      <div className="flex min-w-max flex-col gap-1 p-4">
        {summariesQuery.isError ? (
          <div className="rounded-[var(--radius-input)] border border-[var(--color-warning)] bg-[var(--surface-app)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--text-muted)]">
            Totales y notas no disponibles.
          </div>
        ) : null}

        {blastFieldGroups.map((fieldGroup) => (
          <BlastFieldGroupTable
            blasts={blasts}
            columnSizing={columnSizing}
            fieldGroup={fieldGroup}
            getFieldSummary={findFieldSummary}
            isCollapsed={Boolean(collapsedGroupIds[fieldGroup.id])}
            key={fieldGroup.id}
            onColumnSizingChange={setColumnSizing}
            onToggleCollapse={() => toggleFieldGroup(fieldGroup.id)}
          />
        ))}
      </div>
    </section>
  );
}
