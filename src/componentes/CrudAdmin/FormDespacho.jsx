import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { API_DESPACHOS, API_VENTAS } from "../../config/api";

export const FormDespacho = ({ venta, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fechaDespacho: new Date().toISOString().slice(0, 10),
      patenteCamion: "",
    },
  });

  const onSubmit = async (data) => {
    const despachoPayload = {
      fechaDespacho: data.fechaDespacho,
      patenteCamion: data.patenteCamion.toUpperCase(),
      intento: 0,
      despachado: false,
      idCompra: venta.idVenta,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra,
    };

    const ventaPayload = {
      fechaCompra: venta.fechaCompra,
      direccionCompra: venta.direccionCompra,
      valorCompra: venta.valorCompra,
      despachoGenerado: true,
    };

    try {
      await axios.put(`${API_VENTAS}/api/v1/ventas/${venta.idVenta}`, ventaPayload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      await axios.post(`${API_DESPACHOS}/api/v1/despachos`, despachoPayload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      await Swal.fire({
        title: "Despacho generado",
        text: "La orden fue enviada al modulo de despachos.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onClose();
    } catch (error) {
      await Swal.fire({
        title: "No se pudo generar",
        text: "Revisa que ventas y despachos esten disponibles.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error generando despacho:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[min(92vw,560px)] p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Orden de despacho
        </p>
        <h3 className="mt-2 text-2xl font-bold text-slate-950">
          Generar despacho
        </h3>
      </div>

      <div className="mb-5 rounded-md bg-slate-50 p-4 text-sm text-slate-700">
        <div className="grid gap-2 sm:grid-cols-2">
          <p>
            <span className="font-bold">OC:</span> #{venta.idVenta}
          </p>
          <p>
            <span className="font-bold">Valor:</span> $
            {Number(venta.valorCompra).toLocaleString("es-CL")}
          </p>
          <p className="sm:col-span-2">
            <span className="font-bold">Direccion:</span>{" "}
            {venta.direccionCompra}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Fecha despacho
          <input
            type="date"
            className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
            {...register("fechaDespacho", { required: true })}
          />
        </label>

        <label className="grid gap-1 text-sm font-semibold text-slate-700">
          Patente camion
          <input
            type="text"
            placeholder="ABCD12"
            className="h-11 rounded-md border border-slate-300 px-3 font-normal uppercase outline-none focus:border-cyan-600"
            {...register("patenteCamion", { required: true })}
          />
        </label>
      </div>

      <button
        className="mt-6 h-11 w-full rounded-md bg-cyan-700 px-5 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Generando..." : "Asignar despacho"}
      </button>
    </form>
  );
};
