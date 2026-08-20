import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Flag } from "../../ui/Flag";
import CheckoutButton from "./CheckoutButton";

function TodayItem({ activity }) {
  const { id, status, guests, numNights, cabins } = activity;
  const isArriving = status === "unconfirmed";
  const isDeparting = status === "checked-in";

  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-zinc-950/60 hover:bg-zinc-800/40 border border-zinc-800/80 rounded-xl transition-all duration-200 group">
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Status Tag Pill */}
        <span
          className={`flex-shrink-0 px-2.5 py-1 rounded-md text-[1.15rem] font-semibold uppercase tracking-wider ${
            isArriving
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
          }`}
        >
          {isArriving ? "Arriving" : "Departing"}
        </span>

        {/* Guest flag and name */}
        <div className="flex items-center gap-2.5 min-w-0">
          {guests?.countryFlag ? (
            <div className="w-5 h-4 flex-shrink-0 overflow-hidden rounded shadow-sm">
              <Flag src={guests.countryFlag} alt={`Flag of ${guests?.country || ""}`} />
            </div>
          ) : (
            <span className="text-[1.3rem]">🌍</span>
          )}
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-zinc-100 text-[1.4rem] truncate group-hover:text-amber-300 transition-colors">
              {guests?.fullName || "Guest"}
            </span>
            <span className="text-zinc-500 text-[1.2rem]">
              {cabins?.name ? `${cabins.name} • ` : ""}
              {numNights} {numNights === 1 ? "night stay" : "nights stay"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-end flex-shrink-0 self-end sm:self-center">
        {isArriving && (
          <Link
            to={`/checkin/${id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-[1.25rem] font-semibold transition-all duration-200 no-underline shadow-sm"
          >
            <LogIn className="w-4 h-4" />
            Check In
          </Link>
        )}
        {isDeparting && <CheckoutButton bookingId={id} />}
      </div>
    </li>
  );
}

export default TodayItem;
