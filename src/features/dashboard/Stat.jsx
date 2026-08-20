

import { motion } from "framer-motion";
import NumberFlow from "@number-flow/react";

const themeMap = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-400",
    glow: "shadow-[0_0_24px_-6px_rgba(245,158,11,0.25)]",
    gradient: "from-amber-500/15 via-transparent to-transparent",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    glow: "shadow-[0_0_24px_-6px_rgba(16,185,129,0.25)]",
    gradient: "from-emerald-500/15 via-transparent to-transparent",
  },
  sky: {
    bg: "bg-sky-500/10",
    border: "border-sky-500/20",
    text: "text-sky-400",
    glow: "shadow-[0_0_24px_-6px_rgba(56,189,248,0.25)]",
    gradient: "from-sky-500/15 via-transparent to-transparent",
  },
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    text: "text-indigo-400",
    glow: "shadow-[0_0_24px_-6px_rgba(99,102,241,0.25)]",
    gradient: "from-indigo-500/15 via-transparent to-transparent",
  },
};

function Stat({
  icon,
  title,
  numericValue,
  prefix = "",
  suffix = "",
  formatOptions = { maximumFractionDigits: 0 },
  theme = "sky",
  trend,
  subtext,
  badgeText,
}) {
  const currentTheme = themeMap[theme] || themeMap.sky;
  const isPositive = trend === undefined || trend >= 0;

  return (
    <motion.div
      className={`relative overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 hover:border-zinc-700/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 group`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle top ambient glow */}
      <div
        className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-br ${currentTheme.gradient} rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500`}
      />

      {/* Header with Icon and Title/Badges */}
      <div className="flex items-start justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text} border ${currentTheme.glow}`}
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {icon}
            </span>
          </div>
          <div>
            <p className="text-[1.25rem] font-semibold text-zinc-400 uppercase tracking-wider">
              {title}
            </p>
          </div>
        </div>

        {badgeText ? (
          <span
            className={`text-[1.15rem] font-medium px-2.5 py-1 rounded-full border ${currentTheme.bg} ${currentTheme.border} ${currentTheme.text}`}
          >
            {badgeText}
          </span>
        ) : trend !== undefined ? (
          <span
            className={`text-[1.15rem] font-medium px-2.5 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        ) : null}
      </div>

      {/* Main Metric Value with NumberFlow */}
      <div className="relative z-10 mt-1">
        <div className="text-[3.2rem] font-bold text-zinc-100 tracking-tight leading-none tabular-nums flex items-baseline">
          <NumberFlow
            value={numericValue}
            prefix={prefix}
            suffix={suffix}
            format={formatOptions}
            willChange
          />
        </div>
      </div>

      {/* Contextual Sub-metrics */}
      {subtext && (
        <div className="relative z-10 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[1.2rem] text-zinc-400">
          <span>{subtext}</span>
        </div>
      )}
    </motion.div>
  );
}

export default Stat;
