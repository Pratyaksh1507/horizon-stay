import { format, isToday } from "date-fns";
import { BedDouble, CheckCircle2, Clock, DollarSign, MessageSquare, Utensils, XCircle } from "lucide-react";
import { Flag } from "../../ui/Flag";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    createdAt,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests = {},
    cabins = {},
  } = booking;

  const bookedDate = created_at || createdAt || new Date().toISOString();
  const guestName = guests?.fullName || "Guest";
  const email = guests?.email || "";
  const nationality = guests?.nationality || guests?.country || "International";
  const countryFlag = guests?.countryFlag;
  const cabinName = cabins?.name || "---";

  return (
    <section className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-amber-500/20 via-zinc-900 to-zinc-900 border-b border-zinc-800/90 px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[1.8rem] font-bold text-zinc-100 flex items-center gap-2">
              {numNights} Nights in Cabin <span className="font-mono text-amber-400">#{cabinName}</span>
            </p>
            <p className="text-[1.2rem] text-zinc-400">
              Reserved for {numGuests} {numGuests === 1 ? "guest" : "guests"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[1.3rem] text-zinc-300">
          <Clock className="w-4 h-4 text-zinc-500" />
          <span>
            {format(new Date(startDate), "EEE, MMM dd yyyy")}{" "}
            <span className="text-zinc-500 font-normal">
              ({isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)})
            </span>{" "}
            &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </span>
        </div>
      </header>

      {/* Main Content Details */}
      <div className="p-6 sm:p-8 flex flex-col gap-6">
        {/* Guest Profile Chip */}
        <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 text-[1.35rem]">
          {countryFlag && (
            <div className="w-6 h-5 flex items-center justify-center">
              <Flag src={countryFlag} alt={nationality} />
            </div>
          )}
          <span className="font-bold text-zinc-100">{guestName}</span>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">{email}</span>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-400">{nationality}</span>
        </div>

        {/* Observations / Special Requests */}
        {observations && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/40 border border-zinc-800/70 text-[1.3rem]">
            <MessageSquare className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-zinc-300 block mb-0.5">Special Requests & Notes:</span>
              <p className="text-zinc-400 leading-relaxed">{observations}</p>
            </div>
          </div>
        )}

        {/* Amenities Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <Utensils className="w-5 h-5 text-amber-400" />
            <div>
              <span className="text-[1.15rem] font-semibold uppercase tracking-wider text-zinc-500 block">
                Breakfast Package
              </span>
              <span className="text-[1.35rem] font-medium text-zinc-200">
                {hasBreakfast ? "Included for all guests" : "Not included"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-950/50 border border-zinc-800/80">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <div>
              <span className="text-[1.15rem] font-semibold uppercase tracking-wider text-zinc-500 block">
                Rate Breakdown
              </span>
              <span className="text-[1.35rem] font-medium text-zinc-200">
                {formatCurrency(cabinPrice)} room {hasBreakfast ? `+ ${formatCurrency(extrasPrice)} extras` : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Total Price & Payment Banner */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 rounded-xl border ${
            isPaid
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
              : "bg-amber-500/10 border-amber-500/20 text-amber-400"
          }`}
        >
          <div className="flex items-center gap-3">
            {isPaid ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            ) : (
              <XCircle className="w-6 h-6 text-amber-400" />
            )}
            <div>
              <span className="text-[1.15rem] font-semibold uppercase tracking-wider text-zinc-400 block">
                Total Reservation Fee
              </span>
              <span className="text-[2.6rem] font-extrabold text-zinc-100 tabular-nums leading-none">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </div>

          <span
            className={`px-3 py-1.5 rounded-lg text-[1.25rem] font-bold uppercase tracking-wider self-start sm:self-auto border ${
              isPaid
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                : "bg-amber-500/20 text-amber-300 border-amber-500/30"
            }`}
          >
            {isPaid ? "Payment Settled & Paid" : "Unpaid • Collect at Desk"}
          </span>
        </div>
      </div>

      {/* Footer Timestamp */}
      <footer className="px-6 sm:px-8 py-3.5 text-[1.2rem] text-zinc-500 text-right border-t border-zinc-800/80 bg-zinc-950/40">
        <p>Booked on {format(new Date(bookedDate), "EEEE, MMMM dd, yyyy 'at' p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
