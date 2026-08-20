import { motion } from "framer-motion";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function Cabins() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
        <div>
          <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
            Resort Cabins & Suites
          </h1>
          <p className="text-[1.3rem] text-zinc-400 mt-0.5">
            Configure luxury unit inventory, base pricing, capacities, and seasonal discounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CabinTableOperations />
          <AddCabin />
        </div>
      </div>

      <CabinTable />
    </motion.div>
  );
}

export default Cabins;
