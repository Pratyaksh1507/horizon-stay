import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] gap-3 items-center text-[1.35rem] py-2 border-b border-zinc-800 first:border-t border-zinc-800">
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}

      {guests?.countryFlag ? (
        <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      ) : (
        <span>🌍</span>
      )}

      <span className="font-medium text-zinc-200">{guests?.fullName}</span>
      <span className="text-zinc-400">{numNights} nights</span>

      {status === "unconfirmed" && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </li>
  );
}

export default TodayItem;
