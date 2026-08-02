import { motion } from "framer-motion";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import DashboardFilter from "../features/dashboard/DashboardFilter";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function Dashboard() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight">
          Dashboard
        </h1>
        <DashboardFilter />
      </div>
      <DashboardLayout />
    </motion.div>
  );
}

export default Dashboard;
