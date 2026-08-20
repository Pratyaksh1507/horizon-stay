import { format, isToday } from "date-fns";
import { HiEye, HiArrowUpOnSquare, HiTrash, HiArrowDownOnSquare } from "react-icons/hi2";
import { BedDouble } from "lucide-react";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import { Flag } from "../../ui/Flag";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";

function BookingRow({ booking }) {
  const {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests = {},
    cabins = {},
  } = booking;

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const guestName = guests?.fullName || "Guest";
  const email = guests?.email || "";
  const countryFlag = guests?.countryFlag;
  const cabinName = cabins?.name || "---";

  return (
    <Table.Row>
      {/* Cabin unit */}
      <div className="flex items-center gap-2 font-mono font-bold text-zinc-100 text-[1.45rem]">
        <div className="w-8 h-8 rounded-lg bg-zinc-950/80 border border-zinc-800 flex items-center justify-center text-amber-400">
          <BedDouble className="w-4 h-4" />
        </div>
        <span>{cabinName}</span>
      </div>

      {/* Guest Name & Flag */}
      <div className="flex items-center gap-2.5 min-w-0">
        {countryFlag && (
          <div className="w-5 h-4 flex-shrink-0 flex items-center justify-center">
            <Flag src={countryFlag} alt={guests?.nationality || ""} />
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-zinc-100 text-[1.4rem] truncate">
            {guestName}
          </span>
          <span className="text-zinc-400 text-[1.2rem] truncate">
            {email} {numGuests > 1 ? `• ${numGuests} guests` : ""}
          </span>
        </div>
      </div>

      {/* Stay Dates */}
      <div className="flex flex-col gap-0.5">
        <span className="text-zinc-200 font-medium text-[1.3rem]">
          {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} {numNights === 1 ? "night" : "nights"}
        </span>
        <span className="text-zinc-400 text-[1.15rem]">
          {format(new Date(startDate), "MMM dd, yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd, yyyy")}
        </span>
      </div>

      {/* Status Badge */}
      <div>
        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
      </div>

      {/* Total Amount */}
      <div className="font-bold text-zinc-100 text-[1.45rem] tabular-nums">
        {formatCurrency(totalPrice)}
      </div>

      {/* Action Menu */}
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See Details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="reservation"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
