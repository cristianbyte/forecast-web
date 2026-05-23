import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import { getBlasts, syncBlasts } from "../../services/blastApi";
import { BlastGroupedTables } from "./BlastGroupedTables";

const EMPTY_BLASTS = [];

export function BlastView({ location, title }) {
  const queryClient = useQueryClient();

  const blastsQuery = useQuery({
    queryKey: ["blasts", location],
    queryFn: () => getBlasts(location),
  });

  const syncMutation = useMutation({
    mutationFn: () => syncBlasts(location),
    onSuccess: async (result) => {
      if ((result?.created ?? 0) > 0 || (result?.updated ?? 0) > 0) {
        await queryClient.invalidateQueries({ queryKey: ["blasts", location] });
      }
    },
  });

  const rows = blastsQuery.data ?? EMPTY_BLASTS;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4">
      <header className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--surface-app)] pb-4">
        <div>
          <h1 className="mt-1 text-[16px] font-bold uppercase tracking-wide text-[var(--color-primary)]">
            Voladuras / {title}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-[var(--radius-btn)] bg-[var(--color-primary)] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white hover:opacity-90 disabled:opacity-60"
            type="button"
            disabled={syncMutation.isPending}
            onClick={() => syncMutation.mutate()}
          >
            <RefreshCw size={15} />
            {syncMutation.isPending ? "Sincronizando" : "Sincronizar"}
          </button>
        </div>
      </header>

      {blastsQuery.isError ? (
        <div className="rounded-[var(--radius-card)] border border-[var(--color-danger)] bg-[var(--color-danger-dim)] px-4 py-3 text-[12px] font-bold text-[var(--color-danger)]">
          No se pudo cargar la informacion.
        </div>
      ) : null}

      {blastsQuery.isLoading ? (
        <div className="rounded-[var(--radius-card)] border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-3 text-[12px] font-medium text-[var(--text-muted)]">
          Cargando registros desde backend...
        </div>
      ) : null}

      <BlastGroupedTables blasts={rows} />
    </div>
  );
}
