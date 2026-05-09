const EmergencyBanner = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4">
      <div className="glass w-full max-w-md rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-rose-200">You matter.</h3>
        <p className="mt-3 text-sm text-slate-200">Please talk to someone. Help is available.</p>
        <p className="mt-2 rounded-lg bg-rose-500/20 px-3 py-2 text-sm text-rose-100">
          Kiran Helpline: 1800-599-0019
        </p>
        <button
          onClick={onClose}
          className="mt-5 rounded-full bg-indigo-500 px-5 py-2 text-sm font-medium text-white"
        >
          I Understand
        </button>
      </div>
    </div>
  );
};

export default EmergencyBanner;
