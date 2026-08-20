import { motion } from "framer-motion";
import { ArrowLeft, LogIn, LogOut, Trash2 } from "lucide-react";
import BookingDataBox from "./BookingDataBox";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (!booking) return null;

  const { status, id: bookingId } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <motion.div
      className="flex flex-col gap-6 max-w-[100rem] mx-auto pb-12"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-4">
          <button
            onClick={moveBack}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
              Reservation #{bookingId}
            </h1>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </div>
        </div>

        {/* Action Group */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {status === "unconfirmed" && (
            <button
              onClick={() => navigate(`/checkin/${bookingId}`)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.3rem] font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Check In Guest</span>
            </button>
          )}

          {status === "checked-in" && (
            <button
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[1.3rem] font-semibold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>{isCheckingOut ? "Checking Out..." : "Check Out"}</span>
            </button>
          )}

          <Modal>
            <Modal.Open opens="delete">
              <button
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-[1.3rem] font-medium transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="reservation"
                disabled={isDeleting}
                onConfirm={() =>
                  deleteBooking(bookingId, {
                    onSettled: () => navigate("/bookings"),
                  })
                }
              />
            </Modal.Window>
          </Modal>
        </div>
      </div>

      {/* Main Reservation Card */}
      <BookingDataBox booking={booking} />
    </motion.div>
  );
}

export default BookingDetail;
