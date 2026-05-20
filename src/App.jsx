import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { BlastView } from "./features/blasts/BlastView";
import { BlankModule } from "./pages/BlankModule";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate replace to="/voladuras/hs" />} />
        <Route
          path="voladuras/hs"
          element={<BlastView location="HATILLO SUR" title="Hatillo Sur" />}
        />
        <Route
          path="voladuras/hn"
          element={<BlastView location="HATILLO NORTE" title="Hatillo Norte" />}
        />
        <Route
          path="conciliaciones"
          element={<BlankModule title="Conciliaciones" />}
        />
        <Route path="balances" element={<BlankModule title="Balances" />} />
        <Route path="acpm" element={<BlankModule title="ACPM" />} />
        <Route path="*" element={<Navigate replace to="/voladuras/hs" />} />
      </Route>
    </Routes>
  );
}

export default App;
