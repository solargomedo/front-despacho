function Navbar() {
  return (
    <nav className="bg-slate-950 text-white lg:min-h-screen">
      <div className="flex items-center justify-between gap-4 px-5 py-5 lg:block">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Innovatech
          </p>
          <h1 className="mt-2 text-2xl font-bold">Despachos</h1>
        </div>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">
          Produccion
        </span>
      </div>

      <div className="border-t border-white/10 px-5 py-5">
        <p className="text-sm font-semibold text-slate-300">Modulo operativo</p>
        <ul className="mt-4 space-y-2 text-sm">
          <li className="rounded-md bg-white/10 px-3 py-2 font-semibold">
            Ventas y despachos
          </li>
          <li className="px-3 py-2 text-slate-300">Consulta de ordenes</li>
          <li className="px-3 py-2 text-slate-300">Cierre de entregas</li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
