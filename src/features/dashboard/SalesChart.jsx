import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { formatCurrency } from "../../utils/helpers";
import { useDarkMode } from "../../context/DarkModeContext";

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#60a5fa", fill: "#3b82f620" },
        extrasSales: { stroke: "#34d399", fill: "#10b98120" },
        text: "#a1a1aa",
        background: "#18181b",
        grid: "#27272a",
      }
    : {
        totalSales: { stroke: "#2563eb", fill: "#dbeafe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#52525b",
        background: "#fff",
        grid: "#e4e4e7",
      };

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = useMemo(
    () =>
      allDates.map((date) => ({
        label: format(date, "MMM dd"),
        totalSales:
          bookings
            ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.totalPrice, 0) ?? 0,
        extrasSales:
          bookings
            ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
            .reduce((acc, cur) => acc + cur.extrasPrice, 0) ?? 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bookings, numDays]
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <h3 className="text-[1.6rem] font-semibold text-zinc-100 mb-4">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </h3>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text, fontSize: 12 }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" stroke={colors.grid} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDarkMode ? "rgba(24, 24, 27, 0.85)" : "rgba(255, 255, 255, 0.85)",
              border: `1px solid ${colors.grid}`,
              borderRadius: "10px",
              fontSize: "1.3rem",
              backdropFilter: "blur(8px)",
              boxShadow: isDarkMode ? "0 4px 20px rgba(0, 0, 0, 0.3)" : "0 4px 20px rgba(0, 0, 0, 0.05)",
              padding: "10px 14px",
            }}
            itemStyle={{ color: colors.text }}
            labelStyle={{ color: colors.text, fontWeight: "600", marginBottom: "4px" }}
          />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total sales"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
