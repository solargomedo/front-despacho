import Navbar from "./Layouts/Navbar";
import { PruebaCards } from "./CrudAdmin/PruebaCards";

export const CrudAdmin = () => {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <Navbar />
      <div className="min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <PruebaCards />
      </div>
    </div>
  );
};
