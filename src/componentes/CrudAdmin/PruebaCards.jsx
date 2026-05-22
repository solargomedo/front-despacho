import { useState } from "react";
import { FormVenta } from "./FormVenta";
import { TableCompras } from "./TableCompras";
import { TableDespachos } from "./TableDespachos";

export const PruebaCards = () => {
  const [activeView, setActiveView] = useState("ventas");
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshData = () => setRefreshKey((current) => current + 1);

  return (
    <main className="mx-auto max-w-7xl space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
              Panel de operaciones
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950">
              Gestion de ventas y despachos
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Registra nuevas ordenes de compra, genera despachos desde ventas pendientes y consulta el estado de entrega.
            </p>
          </div>

          <div className="flex rounded-md bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveView("ventas")}
              className={`rounded px-4 py-2 text-sm font-bold transition ${
                activeView === "ventas"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Ventas
            </button>
            <button
              type="button"
              onClick={() => setActiveView("despachos")}
              className={`rounded px-4 py-2 text-sm font-bold transition ${
                activeView === "despachos"
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-950"
              }`}
            >
              Despachos
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Agregar venta</h3>
            <p className="mt-1 text-sm text-slate-600">
              La venta se crea como pendiente para que luego pueda generar su despacho.
            </p>
          </div>
        </div>
        <FormVenta onCreated={refreshData} />
      </section>

      {activeView === "ventas" ? (
        <TableCompras refreshKey={refreshKey} onChanged={refreshData} />
      ) : (
        <TableDespachos refreshKey={refreshKey} onChanged={refreshData} />
      )}
    </main>
  );
};
