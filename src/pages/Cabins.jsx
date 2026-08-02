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
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight">
          All cabins
        </h1>
        <CabinTableOperations />
      </div>
      <CabinTable />
      <AddCabin />
    </motion.div>
  );
}

export default Cabins;
