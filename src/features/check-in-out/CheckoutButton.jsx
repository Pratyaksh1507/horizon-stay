import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import Button from "../../ui/Button";

function CheckoutButton({ bookingId }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (id) =>
      updateBooking(id, { status: "checked-out" }),
    onSuccess: () => {
      toast.success(`Booking #${bookingId} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
      navigate("/bookings");
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout(bookingId)}
      disabled={isPending}
    >
      {isPending ? "Checking out..." : "Check out"}
    </Button>
  );
}

export default CheckoutButton;
