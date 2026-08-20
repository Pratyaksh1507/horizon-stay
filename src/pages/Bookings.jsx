import { motion } from "framer-motion";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import BookingTable from "../features/bookings/BookingTable";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function Bookings() {
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
          <div className="flex items-center gap-3">
            <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
              Reservations & Bookings
            </h1>
          </div>
          <p className="text-[1.3rem] text-zinc-400 mt-0.5">
            Manage guest check-ins, filter reservation status, and view financial invoices.
          </p>
        </div>
        <BookingTableOperations />
      </div>

      <BookingTable />
    </motion.div>
  );
}

export default Bookings;
