import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

function Filter({ filterField, options, layoutId = "activeFilterPill" }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) ?? options.at(0).value;

  function handleClick(value) {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set(filterField, value);
      return params;
    });
  }

  return (
    <div className="border border-zinc-800/90 bg-zinc-900/90 backdrop-blur-md rounded-xl p-1.5 flex items-center gap-1 shadow-sm">
      {options.map((option) => {
        const isActive = option.value === currentFilter;
        return (
          <motion.button
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`relative rounded-lg font-medium text-[1.3rem] px-3.5 py-1.5 transition-colors duration-200 ${
              isActive
                ? "text-zinc-100 font-semibold"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {isActive && (
              <motion.div
                layoutId={`${layoutId}-${filterField}`}
                className="absolute inset-0 bg-gradient-to-b from-zinc-700/80 to-zinc-800/90 border border-zinc-600/50 rounded-lg shadow-md"
                initial={false}
                transition={{ type: "spring", stiffness: 450, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {option.icon && <span className="w-4 h-4">{option.icon}</span>}
              {option.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default Filter;
