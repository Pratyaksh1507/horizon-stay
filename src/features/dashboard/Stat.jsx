

const colorMap = {
  blue: "text-blue-400",
  green: "text-emerald-400",
  indigo: "text-indigo-400",
  yellow: "text-amber-400",
};

function Stat({ icon, title, value, color, trend }) {
  const isPositive = !trend || trend >= 0;
  const iconColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className={`w-5 h-5 ${iconColor}`}>{icon}</span>
          <p className="text-[1.15rem] font-medium text-zinc-400">
            {title}
          </p>
        </div>
        {trend !== undefined && (
          <span
            className={`text-[1.1rem] font-medium px-2 py-0.5 rounded-md ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <p className="text-[2.4rem] font-semibold text-zinc-100 tracking-tight leading-none mt-1">
        {value}
      </p>
    </div>
  );
}

export default Stat;
