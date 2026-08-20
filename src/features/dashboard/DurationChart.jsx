import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import NumberFlow from "@number-flow/react";
import { Clock } from "lucide-react";
import { useDarkMode } from "../../context/DarkModeContext";

const DURATION_PALETTE = [
  { duration: "1 night", label: "1 Night", color: "#f59e0b" },
  { duration: "2 nights", label: "2 Nights", color: "#fbbf24" },
  { duration: "3 nights", label: "3 Nights", color: "#10b981" },
  { duration: "4-5 nights", label: "4-5 Nights", color: "#06b6d4" },
  { duration: "6-7 nights", label: "6-7 Nights", color: "#38bdf8" },
  { duration: "8-14 nights", label: "8-14 Nights", color: "#6366f1" },
  { duration: "15-21 nights", label: "15-21 Nights", color: "#a855f7" },
  { duration: "21+ nights", label: "21+ Nights", color: "#ec4899" },
];

function prepareData(stays) {
  const counts = {
    "1 night": 0,
    "2 nights": 0,
    "3 nights": 0,
    "4-5 nights": 0,
    "6-7 nights": 0,
    "8-14 nights": 0,
    "15-21 nights": 0,
    "21+ nights": 0,
  };

  stays.forEach((stay) => {
    const num = stay.numNights;
    if (num === 1) counts["1 night"]++;
    else if (num === 2) counts["2 nights"]++;
    else if (num === 3) counts["3 nights"]++;
    else if (num === 4 || num === 5) counts["4-5 nights"]++;
    else if (num === 6 || num === 7) counts["6-7 nights"]++;
    else if (num >= 8 && num <= 14) counts["8-14 nights"]++;
    else if (num >= 15 && num <= 21) counts["15-21 nights"]++;
    else if (num >= 22) counts["21+ nights"]++;
  });

  return DURATION_PALETTE.map((item) => ({
    ...item,
    value: counts[item.duration] || 0,
  })).filter((item) => item.value > 0);
}

function CustomDurationTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0].payload;

  return (
    <div className="bg-zinc-950/95 border border-zinc-800/90 shadow-2xl rounded-xl p-3 backdrop-blur-xl min-w-[150px]">
      <div className="flex items-center gap-2 mb-1">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        <span className="text-[1.3rem] font-semibold text-zinc-100">
          {entry.label}
        </span>
      </div>
      <p className="text-[1.2rem] text-zinc-400">
        <span className="font-bold text-zinc-100 tabular-nums">
          {entry.value}
        </span>{" "}
        {entry.value === 1 ? "booking" : "bookings"}
      </p>
    </div>
  );
}

function DurationChart({ confirmedStays = [] }) {
  const { isDarkMode } = useDarkMode();

  const data = useMemo(
    () => prepareData(confirmedStays),
    [confirmedStays]
  );

  const totalStays = confirmedStays.length;
  const totalNights = useMemo(
    () => confirmedStays.reduce((acc, cur) => acc + (cur.numNights || 0), 0),
    [confirmedStays]
  );

  const avgDuration = totalStays > 0 ? (totalNights / totalStays).toFixed(1) : "0.0";

  const topDuration = useMemo(() => {
    if (!data.length) return null;
    return [...data].sort((a, b) => b.value - a.value)[0];
  }, [data]);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 flex flex-col justify-between gap-4 h-full shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
            Stay Duration Insights
          </h3>
          <p className="text-[1.25rem] text-zinc-400">
            Guest length-of-stay distribution
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Chart Section with Center Stats */}
      <div className="relative flex items-center justify-center my-2">
        <div className="w-full h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.length > 0 ? data : [{ duration: "none", value: 1, color: "#27272a" }]}
                nameKey="label"
                dataKey="value"
                innerRadius={68}
                outerRadius={92}
                cx="50%"
                cy="50%"
                paddingAngle={data.length > 1 ? 4 : 0}
                stroke="#18181b"
                strokeWidth={2}
              >
                {data.length > 0
                  ? data.map((entry) => (
                      <Cell key={entry.duration} fill={entry.color} />
                    ))
                  : <Cell fill="#27272a" />}
              </Pie>
              {data.length > 0 && <Tooltip content={<CustomDurationTooltip />} />}
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center Metric Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider">
            Avg Stay
          </span>
          <span className="text-[2.6rem] font-extrabold text-zinc-100 tracking-tight tabular-nums flex items-baseline leading-none mt-0.5">
            <NumberFlow
              value={Number(avgDuration)}
              format={{ maximumFractionDigits: 1, minimumFractionDigits: 1 }}
            />
            <span className="text-[1.2rem] font-medium text-zinc-500 ml-1">
              nights
            </span>
          </span>
        </div>
      </div>

      {/* Legend Grid */}
      {data.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-zinc-800/60">
          {data.map((item) => {
            const percentage = Math.round((item.value / totalStays) * 100);
            return (
              <div key={item.duration} className="flex items-center justify-between text-[1.2rem]">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-zinc-300 font-medium truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-zinc-400 font-semibold tabular-nums ml-2">
                  {percentage}%
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-[1.3rem] text-zinc-500 py-2">
          No stays recorded in this period
        </p>
      )}

      {/* Insight Footer */}
      {topDuration && (
        <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-center justify-between text-[1.2rem]">
          <span className="text-zinc-400">Peak Preference:</span>
          <span className="font-semibold text-amber-300">
            {topDuration.label} ({topDuration.value} {topDuration.value === 1 ? "stay" : "stays"})
          </span>
        </div>
      )}
    </div>
  );
}

export default DurationChart;
