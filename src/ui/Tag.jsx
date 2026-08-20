const typeStyles = {
  blue: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  silver: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  indigo: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  red: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  yellow: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

const dotColors = {
  blue: "bg-sky-400",
  green: "bg-emerald-400",
  silver: "bg-zinc-400",
  indigo: "bg-indigo-400",
  red: "bg-rose-400",
  yellow: "bg-amber-400",
};

function Tag({ children, type = "blue" }) {
  const dotColor = dotColors[type] || "bg-sky-400";
  return (
    <span
      className={`inline-flex items-center gap-1.5 uppercase text-[1.1rem] font-bold px-2.5 py-0.5 rounded-md border tracking-wider ${
        typeStyles[type] || typeStyles.blue
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{children}</span>
    </span>
  );
}

export default Tag;
