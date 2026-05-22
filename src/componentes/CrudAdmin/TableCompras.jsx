import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { API_VENTAS } from "../../config/api";
import { FormDespacho } from "./FormDespacho";
import { Modal } from "./Modal";

export const TableCompras = ({ refreshKey = 0, onChanged = () => {} }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const compras = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_VENTAS}/api/v1/ventas`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setVentas(response.data);
    } catch (requestError) {
      setError("No se pudieron cargar las ventas.");
      console.error("Error cargando ventas:", requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    compras();
  }, [compras, refreshKey]);

  const ventasPendientes = useMemo(
    () => ventas.filter((venta) => !venta.despachoGenerado),
    [ventas]
  );

  const handleAbrirModal = (venta) => {
    setVentaSeleccionada(venta);
    setOpenModal(true);
  };

  const handleClose = async () => {
    setOpenModal(false);
    setVentaSeleccionada(null);
    await compras();
    onChanged();
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Ventas pendientes</h3>
          <p className="mt-1 text-sm text-slate-600">
            Ordenes de compra disponibles para generar despacho.
          </p>
        </div>
        <button
          type="button"
          onClick={compras}
          className="h-10 rounded-md border border-slate-300 px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">OC</th>
              <th className="px-4 py-3">Direccion</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Valor</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Accion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="6">
                  Cargando ventas...
                </td>
              </tr>
            ) : ventasPendientes.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="6">
                  No hay ventas pendientes de despacho.
                </td>
              </tr>
            ) : (
              ventasPendientes.map((venta) => (
                <tr key={venta.idVenta} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900">
                    #{venta.idVenta}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {venta.direccionCompra}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {venta.fechaCompra}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    ${Number(venta.valorCompra).toLocaleString("es-CL")}
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleAbrirModal(venta)}
                      className="rounded-md bg-cyan-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
                    >
                      Generar despacho
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        onClose={() => {
          setOpenModal(false);
          setVentaSeleccionada(null);
        }}
        open={openModal}
      >
        {ventaSeleccionada && (
          <FormDespacho venta={ventaSeleccionada} onClose={handleClose} />
        )}
      </Modal>
    </section>
  );
};
