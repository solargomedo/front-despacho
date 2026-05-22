import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { API_VENTAS } from "../../config/api";

export const FormVenta = ({ onCreated }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fechaCompra: new Date().toISOString().slice(0, 10),
      direccionCompra: "",
      valorCompra: "",
    },
  });

  const onSubmit = async (data) => {
    const payload = {
      fechaCompra: data.fechaCompra,
      direccionCompra: data.direccionCompra,
      valorCompra: Number(data.valorCompra),
      despachoGenerado: false,
    };

    try {
      await axios.post(`${API_VENTAS}/api/v1/ventas`, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      reset({
        fechaCompra: new Date().toISOString().slice(0, 10),
        direccionCompra: "",
        valorCompra: "",
      });
      await Swal.fire({
        title: "Venta registrada",
        text: "La orden de compra quedo disponible para despacho.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
      onCreated();
    } catch (error) {
      await Swal.fire({
        title: "No se pudo registrar",
        text: "Revisa que el backend de ventas este disponible.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error creando venta:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-4">
      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Fecha compra
        <input
          type="date"
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
          {...register("fechaCompra", { required: true })}
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-slate-700 md:col-span-2">
        Direccion de entrega
        <input
          type="text"
          placeholder="Av. Principal 123"
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
          {...register("direccionCompra", { required: true })}
        />
      </label>

      <label className="grid gap-1 text-sm font-semibold text-slate-700">
        Valor
        <input
          type="number"
          min="1"
          placeholder="25000"
          className="h-11 rounded-md border border-slate-300 px-3 font-normal outline-none focus:border-cyan-600"
          {...register("valorCompra", { required: true, min: 1 })}
        />
      </label>

      <div className="md:col-span-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 rounded-md bg-slate-950 px-5 text-sm font-bold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isSubmitting ? "Guardando..." : "Agregar venta"}
        </button>
      </div>
    </form>
  );
};
