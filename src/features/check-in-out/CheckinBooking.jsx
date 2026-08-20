import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, DollarSign, LogIn, Utensils } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import { updateBooking } from "../../services/apiBookings";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { mutate: checkin, isPending } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["booking", String(data.id)] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["today-activity"] });
      toast.success(`Booking #${data.id} checked in successfully`);
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading || isLoadingSettings) return <Spinner />;
  if (!booking) return null;

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  const optionalBreakfastPrice =
    (settings?.breakfastPrice || 15) * numNights * numGuests;

  const calculatedTotal = !hasBreakfast && addBreakfast
    ? totalPrice + optionalBreakfastPrice
    : totalPrice;

  function handleCheckin() {
    if (!confirmPaid) {
      toast.error("Please confirm payment settlement before proceeding");
      return;
    }

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <motion.div
      className="flex flex-col gap-6 max-w-[100rem] mx-auto pb-12"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3.5">
          <button
            onClick={moveBack}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
              Front Desk Check-In: #{bookingId}
            </h1>
            <p className="text-[1.25rem] text-zinc-400">
              Verify guest identification, optional meal plans, and collect outstanding folio balance.
            </p>
          </div>
        </div>
      </div>

      {/* Main Reservation Summary Box */}
      <BookingDataBox booking={booking} />

      {/* Optional Breakfast Upsell */}
      {!hasBreakfast && (
        <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-[1.5rem] font-bold text-zinc-100">
                Add Gourmet Breakfast Package?
              </h4>
              <p className="text-[1.25rem] text-zinc-400">
                Add daily breakfast buffet for {numGuests} guests for {numNights} nights ({formatCurrency(optionalBreakfastPrice)} total).
              </p>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              id="breakfast"
              checked={addBreakfast}
              onChange={() => {
                setAddBreakfast((prev) => !prev);
                setConfirmPaid(false);
              }}
              className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
            />
            <span className="text-[1.35rem] font-semibold text-zinc-200 hidden sm:inline">Add Breakfast</span>
          </label>
        </div>
      )}

      {/* Payment Confirmation Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-[1.5rem] font-bold text-zinc-100">
              Payment Settlement Acknowledgment
            </h4>
            <p className="text-[1.25rem] text-zinc-400">
              I confirm that the guest has settled the total amount of{" "}
              <span className="font-bold text-zinc-100 tabular-nums">
                {formatCurrency(calculatedTotal)}
              </span>
              {addBreakfast ? ` (including ${formatCurrency(optionalBreakfastPrice)} breakfast)` : ""}.
            </p>
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            id="confirm-paid"
            checked={confirmPaid}
            disabled={confirmPaid && isPaid}
            onChange={() => setConfirmPaid((prev) => !prev)}
            className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
          />
          <span className="text-[1.35rem] font-semibold text-zinc-200 hidden sm:inline">Paid & Verified</span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={moveBack}
          className="px-5 py-2.5 rounded-xl text-[1.35rem] font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleCheckin}
          disabled={!confirmPaid || isPending}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.35rem] font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn className="w-4 h-4" />
          <span>{isPending ? "Checking in..." : `Complete Check-In (#${bookingId})`}</span>
        </button>
      </div>
    </motion.div>
  );
}

export default CheckinBooking;
