const typeStyles = {
  blue: "bg-blue-500/10 text-blue-400",
  green: "bg-emerald-500/10 text-emerald-400",
  silver: "bg-zinc-500/10 text-zinc-400",
  indigo: "bg-indigo-500/10 text-indigo-400",
  red: "bg-red-500/10 text-red-400",
  yellow: "bg-amber-500/10 text-amber-400",
};

function Tag({ children, type = "blue" }) {
  return (
    <span
      className={`w-fit uppercase text-[1.05rem] font-semibold px-3 py-1 rounded-full ${typeStyles[type] || typeStyles.blue}`}
    >
      {children}
    </span>
  );
}

export default Tag;
