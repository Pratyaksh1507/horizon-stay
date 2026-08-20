import { motion } from "framer-motion";
import { useRecentStays } from "./useRecentStays";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";
import CabinOccupancyMatrix from "./CabinOccupancyMatrix";
import DashboardHeader from "./DashboardHeader";
import { StatCardChoropleth } from "../../components/stat-card-choropleth";
import DashboardSkeleton from "../../ui/DashboardSkeleton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function DashboardLayout() {
  const { bookings = [], isLoading: isLoading1 } = useRecentBookings();
  const {
    confirmedStays = [],
    stays = [],
    isLoading: isLoading2,
    numDays = 7,
  } = useRecentStays();
  const { cabins = [], isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) {
    return <DashboardSkeleton />;
  }

  const totalNights = confirmedStays.reduce(
    (acc, cur) => acc + (cur.numNights || 0),
    0
  );
  const maxPossibleNights = numDays * Math.max(cabins.length, 1);
  const occupancyRate = maxPossibleNights > 0 ? totalNights / maxPossibleNights : 0;

  return (
    <motion.div
      className="flex flex-col gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Header with Contextual Greeting & Filter */}
      <motion.div variants={itemVariants}>
        <DashboardHeader
          occupancyRate={occupancyRate}
          confirmedCount={confirmedStays.length}
        />
      </motion.div>

      {/* 2. Executive KPI Cards Row */}
      <motion.div variants={itemVariants}>
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numDays={numDays}
          cabinCount={cabins.length}
        />
      </motion.div>

      {/* 3. Middle Section: Sales Intelligence (2/3) + Front Desk Triage (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col">
          <SalesChart
            bookings={bookings}
            confirmedStays={confirmedStays}
            numDays={numDays}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col">
          <TodayActivity />
        </motion.div>
      </div>

      {/* 4. Operations Section: Duration Donut (1/3) + Cabin Availability Matrix (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col">
          <DurationChart confirmedStays={confirmedStays} />
        </motion.div>
        <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col">
          <CabinOccupancyMatrix
            cabins={cabins}
            confirmedStays={stays.length > 0 ? stays : confirmedStays}
          />
        </motion.div>
      </div>

      {/* 5. Global Guest Distribution & Source Markets */}
      <motion.div variants={itemVariants}>
        <StatCardChoropleth
          confirmedStays={stays.length > 0 ? stays : confirmedStays}
          allBookings={bookings}
        />
      </motion.div>
    </motion.div>
  );
}

export default DashboardLayout;
