import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useBooking } from "../bookings/useBooking";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";

import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { formatCurrency } from "../../utils/helpers";

function CheckinBooking() {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();

  const { mutate: checkin, isPending } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: "checked-in", isPaid: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking checked in");
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  if (isLoading) return <Spinner />;

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  function handleCheckin() {
    if (!isPaid && !confirmPaid) {
      toast.error("Please confirm that the booking has been paid");
      return;
    }
    checkin(bookingId);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight">
          Check in booking #{bookingId}
        </h1>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </div>

      <BookingDataBox booking={booking} />

      {!isPaid && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <Checkbox
            id="confirm-paid"
            checked={confirmPaid}
            disabled={isPending}
            onChange={() => setConfirmPaid((checked) => !checked)}
          >
            I confirm that {numGuests} guest{numGuests > 1 ? "s have" : " has"} paid{" "}
            {formatCurrency(totalPrice)} for the {numNights}-night stay
            {hasBreakfast ? ", including breakfast" : ""}.
          </Checkbox>
        </div>
      )}

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={isPending || (!isPaid && !confirmPaid)}>
          {isPending ? "Checking in..." : `Check in booking #${bookingId}`}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
