import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
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
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <header className="bg-brand-600 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4 font-semibold text-[1.7rem] text-white">
          <HiOutlineHomeModern className="w-8 h-8" />
          <p>
            {numNights} nights in Cabin <span className="font-mono text-[2rem] ml-1">{cabinName}</span>
          </p>
        </div>
        <p className="text-white/80 text-[1.5rem]">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <div className="px-8 py-6">
        <div className="flex items-center gap-3 mb-4 text-zinc-400">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p className="font-medium text-zinc-200">{guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ""}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem icon={<HiOutlineChatBubbleBottomCenterText />} label="Observations">
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? "Yes" : "No"}
        </DataItem>

        <div className={`flex items-center justify-between px-6 py-4 rounded-lg mt-6 ${
          isPaid ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
        }`}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
          </DataItem>
          <p className="uppercase text-[1.35rem] font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </div>

      <footer className="px-8 py-4 text-[1.15rem] text-zinc-500 text-right border-t border-zinc-800">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
