export const Modal = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className="max-h-[92vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
        <div className="flex justify-end border-b border-slate-100 p-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 rounded-md bg-slate-100 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
            aria-label="Cerrar modal"
          >
            X
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
