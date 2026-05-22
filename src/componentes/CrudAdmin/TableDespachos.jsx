import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { API_DESPACHOS } from "../../config/api";
import { FormCierreDespacho } from "./FormCierreDespacho";
import { Modal } from "./Modal";

export const TableDespachos = ({ refreshKey = 0, onChanged = () => {} }) => {
  const [despachos, setDespachos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const cargarDespachos = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${API_DESPACHOS}/api/v1/despachos`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      setDespachos(response.data);
    } catch (requestError) {
      setError("No se pudieron cargar los despachos.");
      console.error("Error cargando despachos:", requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarDespachos();
  }, [cargarDespachos, refreshKey]);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  const handleClose = async () => {
    setOpenModal(false);
    setDespachoSeleccionado(null);
    await cargarDespachos();
    onChanged();
  };

  return (
    <section className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Despachos registrados</h3>
          <p className="mt-1 text-sm text-slate-600">
            Consulta entregas, intentos y cierre de ordenes de despacho.
          </p>
        </div>
        <button
          type="button"
          onClick={cargarDespachos}
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
              <th className="px-4 py-3">OD</th>
              <th className="px-4 py-3">OC</th>
              <th className="px-4 py-3">Direccion</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Patente</th>
              <th className="px-4 py-3">Intentos</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Accion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="8">
                  Cargando despachos...
                </td>
              </tr>
            ) : despachos.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-slate-500" colSpan="8">
                  No hay despachos registrados.
                </td>
              </tr>
            ) : (
              despachos.map((despacho) => (
                <tr key={despacho.idDespacho} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-bold text-slate-900">
                    #{despacho.idDespacho}
                  </td>
                  <td className="px-4 py-4 text-slate-700">#{despacho.idCompra}</td>
                  <td className="px-4 py-4 text-slate-700">
                    {despacho.direccionCompra}
                  </td>
                  <td className="px-4 py-4 text-slate-700">
                    {despacho.fechaDespacho}
                  </td>
                  <td className="px-4 py-4 font-semibold text-slate-900">
                    {despacho.patenteCamion}
                  </td>
                  <td className="px-4 py-4 text-slate-700">{despacho.intento}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        despacho.despachado
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {despacho.despachado ? "Entregado" : "Pendiente"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleAbrirModal(despacho)}
                      className="rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-800"
                    >
                      Editar
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
          setDespachoSeleccionado(null);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={handleClose}
          />
        )}
      </Modal>
    </section>
  );
};
