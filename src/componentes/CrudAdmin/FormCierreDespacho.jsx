import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { API_DESPACHOS } from "../../config/api";

export const FormCierreDespacho = ({ despacho, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      intento: despacho.intento ?? 0,
      despachado: String(Boolean(despacho.despachado)),
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      intento: Number(data.intento),
      despachado: data.despachado === "true",
    };

    try {
      await axios.put(
        `${API_DESPACHOS}/api/v1/despachos/${despacho.idDespacho}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      await Swal.fire({
        title: "Despacho actualizado",
        text: "El estado de entrega fue modificado.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      await Swal.fire({
        title: "No se pudo actualizar",
        text: "Revisa que la API de despachos este disponible.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error actualizando despacho:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[min(92vw,560px)] p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Seguimiento de entrega
        </p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          Editar despacho #{despacho.idDespacho}
        </h3>
      </div>

      <div className="mb-5 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        <div className="grid gap-2 sm:grid-cols-2">
          <p>
            <span className="font-bold">OC:</span> #{despacho.idCompra}
          </p>
          <p>
            <span className="font-bold">Patente:</span> {despacho.patenteCamion}
          </p>
          <p>
            <span className="font-bold">Fecha:</span> {despacho.fechaDespacho}
          </p>
          <p>
            <span className="font-bold">Valor:</span> $
            {Number(despacho.valorCompra).toLocaleString("es-CL")}
          </p>
          <p className="sm:col-span-2">
            <span className="font-bold">Direccion:</span>{" "}
            {despacho.direccionCompra}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Intentos de entrega
          <input
            type="number"
            min="0"
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
            {...register("intento", { required: true, min: 0 })}
          />
        </label>

        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Estado
          <select
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
            {...register("despachado", { required: true })}
          >
            <option value="false">Pendiente</option>
            <option value="true">Entregado</option>
          </select>
        </label>
      </div>

      <button
        className="mt-6 h-11 w-full rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Actualizando..." : "Guardar cambios"}
      </button>
    </form>
  );
};
