import { useMemo } from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

const startDataLight = [
  { duration: "1 night", value: 0, color: "#ef4444" },
  { duration: "2 nights", value: 0, color: "#f97316" },
  { duration: "3 nights", value: 0, color: "#eab308" },
  { duration: "4-5 nights", value: 0, color: "#84cc16" },
  { duration: "6-7 nights", value: 0, color: "#22c55e" },
  { duration: "8-14 nights", value: 0, color: "#14b8a6" },
  { duration: "15-21 nights", value: 0, color: "#3b82f6" },
  { duration: "21+ nights", value: 0, color: "#a855f7" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#f87171" },
  { duration: "2 nights", value: 0, color: "#fb923c" },
  { duration: "3 nights", value: 0, color: "#fbbf24" },
  { duration: "4-5 nights", value: 0, color: "#a3e635" },
  { duration: "6-7 nights", value: 0, color: "#4ade80" },
  { duration: "8-14 nights", value: 0, color: "#2dd4bf" },
  { duration: "15-21 nights", value: 0, color: "#60a5fa" },
  { duration: "21+ nights", value: 0, color: "#c084fc" },
];

function incArrayValue(arr, field) {
  return arr.map((obj) =>
    obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
  );
}

function prepareData(startData, stays) {
  return stays
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);
}

function DurationChart({ confirmedStays }) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;

  const data = useMemo(
    () => prepareData(startData, confirmedStays ?? []),
    [startData, confirmedStays]
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-[1.6rem] font-semibold text-zinc-100 mb-4">
        Stay duration summary
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={80}
            outerRadius={105}
            cx="40%"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell
                key={entry.duration}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "rgba(24, 24, 27, 0.85)" : "rgba(255, 255, 255, 0.85)",
              border: `1px solid ${isDarkMode ? "#27272a" : "#e4e4e7"}`,
              borderRadius: "10px",
              fontSize: "1.3rem",
              backdropFilter: "blur(8px)",
              boxShadow: isDarkMode ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
              padding: "10px 14px",
            }}
            itemStyle={{ color: isDarkMode ? "#a1a1aa" : "#52525b" }}
          />
          <Legend
            iconSize={12}
            iconType="circle"
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: "1.2rem" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
