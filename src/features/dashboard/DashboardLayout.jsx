import { motion } from "framer-motion";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

import { StatCardChoropleth } from "../../components/stat-card-choropleth";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

function DashboardLayout() {
  const { bookings = [], isLoading: isLoading1 } = useRecentBookings();
  const { confirmedStays = [], isLoading: isLoading2, numDays = 7 } = useRecentStays();
  const { cabins = [], isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <motion.div
      className="grid grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="col-span-2">
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins.length}
        />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <TodayActivity />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-2">
        <DurationChart confirmedStays={confirmedStays} />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-4">
        <SalesChart bookings={bookings} numDays={numDays} />
      </motion.div>
      <motion.div variants={itemVariants} className="col-span-4">
        <StatCardChoropleth confirmedStays={confirmedStays} />
      </motion.div>
    </motion.div>
  );
}

export default DashboardLayout;
