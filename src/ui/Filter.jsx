import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

function Filter({ filterField, options }) {
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
    <div className="border border-zinc-800/60 bg-zinc-900/50 rounded-lg p-1 flex gap-1">
      {options.map((option) => {
        const isActive = option.value === currentFilter;
        return (
          <motion.button
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={`relative rounded-md font-medium text-[1.35rem] px-4 py-1.5 transition-colors duration-200 ${
              isActive
                ? "text-white"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
            whileTap={{ scale: 0.97 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-brand-600 rounded-md shadow-sm"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default Filter;
