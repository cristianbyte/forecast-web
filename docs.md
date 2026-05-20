# Forecast Frontend Decisions

## Producto
- App de visualizacion, organizacion y seguimiento contable asociado a voladuras.
- Usuario inicial: administrador unico.
- MVP frontend: panel con vistas `Voladura HS`, `Voladura HN`, `Conciliaciones`, `Balances` y `ACPM`.
- `HS` = Hatillo Sur; `HN` = Hatillo Norte.
- Una voladura cerrada no recibe mas actualizaciones operativas y bloquea edicion.

## Frontend
- Stack: React + Vite + Tailwind CSS + JavaScript + pnpm.
- Rutas reales con React Router.
- Data fetching/cache con TanStack Query.
- Tablas con TanStack Table.
- Iconos con Lucide React.
- Diseno: desktop-first, tema claro, panel industrial denso, sin sombras ni gradientes.
- Usar tokens de `src/index.css` como fuente visual principal.

## Voladuras
- `Voladura HS` y `Voladura HN` consumen el mismo recurso backend con filtro por location.
- El backend Spring Boot calcula todos los campos derivados.
- El frontend solo edita campos permitidos y envia cambios al backend.
- El boton `Sincronizar` aplica a la vista activa; si el backend reporta creados o actualizados, se refresca la tabla.

## Campos
- Externos: `location`, `blastCode`, `designHoles`, `realHoles`, `totalRealDrilledMeters`, `designEmulsion`, `realEmulsion`, `p337`, `ikon15m`, `lastSyncedAt`.
- Editables: `subLocation`, `date`, `blastArea`, `seamArea`, `designBurden`, `designSpacing`, `designAverageLength`, `omcAverageLength`, `omcCoalCubicMeters`, `omcTotalCubicMeters`, `notes`.
- Calculados: `period`, `sterileArea`, `designAreaPerHole`, `realAreaPerHole`, `holeAreaDifference`, `blastAreaDifference`, `realAverageLength`, `averageLengthDifference`, `totalDesignDrilledMeters`, `drilledMetersDifference`, `designBlastVolumeWithoutSeams`, `realBlastVolumeWithoutSeams`, `aycOmcDifference`, `omcSterileCubicMeters`, `omcSterileChargeFactor`, `omcAycTotalVolumeDifference`, `opitBlastChargeFactor`, `realAycChargeFactor`, `createdAt`, `updatedAt`, `closedAt`, `status`.

## Workflow
- Prioridad actual: app funcional con DRY, clean code y responsabilidad unica.
- Commits convencionales cuando se empiece a versionar cambios.
- Decisiones del proyecto se guardan aqui.
