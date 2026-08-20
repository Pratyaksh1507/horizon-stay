import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Users, Utensils, CheckCircle2, BedDouble, ArrowLeft } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCabins } from "../features/cabins/useCabins";
import { useSettings } from "../features/settings/useSettings";
import { useCreateBooking } from "../features/bookings/useCreateBooking";
import { formatCurrency } from "../utils/helpers";
import Spinner from "../ui/Spinner";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Spain", "Italy", "Japan", "India", "Switzerland", "Norway",
  "Sweden", "Brazil", "Mexico", "Netherlands", "China", "Singapore",
  "Austria", "Belgium", "Denmark", "Finland", "Ireland", "New Zealand", "Portugal"
];

function NewBooking() {
  const navigate = useNavigate();
  const { cabins = [], isLoading: cabinsLoading } = useCabins();
  const { settings = {}, isLoading: settingsLoading } = useSettings();
  const { createBooking, isCreating } = useCreateBooking();

  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d;
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guestName: "",
      guestEmail: "",
      nationality: "United States",
      numGuests: 2,
      cabinId: "",
      hasBreakfast: true,
      isPaid: false,
      observations: "",
    },
  });

  const selectedCabinId = watch("cabinId");
  const numGuests = Number(watch("numGuests")) || 1;
  const hasBreakfast = watch("hasBreakfast");
  const isPaid = watch("isPaid");

  const selectedCabin = useMemo(() => {
    return cabins.find((c) => c.id === Number(selectedCabinId)) || null;
  }, [cabins, selectedCabinId]);

  const numNights = useMemo(() => {
    if (!checkIn || !checkOut) return 1;
    const diff = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [checkIn, checkOut]);

  const breakfastPricePerNight = settings.breakfastPrice || 15;
  const cabinNightlyPrice = selectedCabin ? selectedCabin.regularPrice - (selectedCabin.discount || 0) : 0;
  const cabinTotal = cabinNightlyPrice * numNights;
  const extrasTotal = hasBreakfast ? breakfastPricePerNight * numNights * numGuests : 0;
  const totalReservationPrice = cabinTotal + extrasTotal;

  function onSubmit(data) {
    if (!selectedCabin) return;

    createBooking(
      {
        guestName: data.guestName,
        guestEmail: data.guestEmail,
        nationality: data.nationality,
        cabinId: Number(data.cabinId),
        numGuests,
        numNights,
        startDate: checkIn.toISOString(),
        endDate: checkOut.toISOString(),
        cabinPrice: cabinTotal,
        extrasPrice: extrasTotal,
        totalPrice: totalReservationPrice,
        hasBreakfast: Boolean(hasBreakfast),
        isPaid: Boolean(isPaid),
        status: isPaid ? "checked-in" : "unconfirmed",
        observations: data.observations || "",
      },
      {
        onSuccess: () => {
          navigate("/bookings");
        },
      }
    );
  }

  if (cabinsLoading || settingsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-[120rem] mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
              Create New Reservation
            </h1>
          </div>
          <p className="text-[1.3rem] text-zinc-400 mt-1">
            Book luxury resort units, register guest details, and manage amenities.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Details */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* 1. Guest Information */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800/80">
              <Users className="w-5 h-5 text-amber-400" />
              <h3 className="text-[1.7rem] font-bold text-zinc-100">Guest Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  {...register("guestName", { required: "Guest name is required" })}
                  className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
                />
                {errors.guestName && <span className="text-[1.15rem] text-red-400">{errors.guestName.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="e.g. eleanor@example.com"
                  {...register("guestEmail", { required: "Email address is required" })}
                  className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
                />
                {errors.guestEmail && <span className="text-[1.15rem] text-red-400">{errors.guestEmail.message}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Origin Country / Nationality
                </label>
                <select
                  {...register("nationality")}
                  className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Number of Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedCabin?.maxCapacity || 10}
                  {...register("numGuests", { min: 1 })}
                  className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
                />
                {selectedCabin && numGuests > selectedCabin.maxCapacity && (
                  <span className="text-[1.15rem] text-amber-400">
                    Warning: Cabin capacity is {selectedCabin.maxCapacity} guests.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 2. Cabin & Stay Dates */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-7 flex flex-col gap-5 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800/80">
              <BedDouble className="w-5 h-5 text-amber-400" />
              <h3 className="text-[1.7rem] font-bold text-zinc-100">Cabin Selection & Stay Dates</h3>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                Select Luxury Cabin *
              </label>
              <select
                {...register("cabinId", { required: "Please choose a cabin" })}
                className="w-full px-4 py-3 text-[1.45rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="">Select a resort unit...</option>
                {cabins.map((c) => (
                  <option key={c.id} value={c.id}>
                    Cabin {c.name} &bull; ${c.regularPrice}/night {c.discount ? `(Discount $${c.discount})` : ""} &bull; Up to {c.maxCapacity} guests
                  </option>
                ))}
              </select>
              {errors.cabinId && <span className="text-[1.15rem] text-red-400">{errors.cabinId.message}</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Check-in Date
                </label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  selectsStart
                  startDate={checkIn}
                  endDate={checkOut}
                  dateFormat="EEE, MMM dd, yyyy"
                  customInput={
                    <input className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer" />
                  }
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                  Check-out Date
                </label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  selectsEnd
                  startDate={checkIn}
                  endDate={checkOut}
                  minDate={checkIn}
                  dateFormat="EEE, MMM dd, yyyy"
                  customInput={
                    <input className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl cursor-pointer" />
                  }
                />
              </div>
            </div>

            {/* Extras Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  {...register("hasBreakfast")}
                  className="w-5 h-5 accent-amber-500 rounded cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-[1.35rem] font-semibold text-zinc-200 flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-amber-400" />
                    Resort Breakfast Included
                  </span>
                  <span className="text-[1.15rem] text-zinc-500">
                    ${breakfastPricePerNight}/guest per night
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-950 border border-zinc-800/80 cursor-pointer hover:border-zinc-700 transition-colors">
                <input
                  type="checkbox"
                  {...register("isPaid")}
                  className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="flex flex-col">
                  <span className="text-[1.35rem] font-semibold text-zinc-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Payment Confirmed
                  </span>
                  <span className="text-[1.15rem] text-zinc-500">
                    Mark invoice paid upon creation
                  </span>
                </div>
              </label>
            </div>

            {/* Observations */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[1.2rem] font-semibold text-zinc-400 uppercase tracking-wider">
                Special Requests & Notes
              </label>
              <textarea
                rows={3}
                placeholder="Dietary requirements, late arrival, special occasions..."
                {...register("observations")}
                className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Summary Card */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-5">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="text-[1.7rem] font-bold text-zinc-100">Reservation Summary</h3>
              <span className="px-2.5 py-1 rounded-full text-[1.15rem] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {numNights} {numNights === 1 ? "Night" : "Nights"}
              </span>
            </div>

            {selectedCabin ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950/70 border border-zinc-800">
                {selectedCabin.image && (
                  <img
                    src={selectedCabin.image}
                    alt={selectedCabin.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/cabin-001.jpg";
                    }}
                    className="w-12 h-12 rounded-lg object-cover border border-zinc-800 flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-zinc-100 text-[1.45rem] truncate">
                    Cabin {selectedCabin.name}
                  </h4>
                  <p className="text-[1.2rem] text-zinc-400">
                    Up to {selectedCabin.maxCapacity} guests &bull; ${selectedCabin.regularPrice}/night
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-zinc-950/50 border border-dashed border-zinc-800 text-center text-[1.3rem] text-zinc-500">
                Select a cabin to view room pricing
              </div>
            )}

            {/* Price Calculations */}
            <div className="flex flex-col gap-2.5 text-[1.35rem]">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Room Rate ({numNights} nights)</span>
                <span className="font-medium text-zinc-200 tabular-nums">
                  {formatCurrency(cabinTotal)}
                </span>
              </div>

              {hasBreakfast && (
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Breakfast ({numGuests} guests &bull; {numNights} nights)</span>
                  <span className="font-medium text-amber-400 tabular-nums">
                    +{formatCurrency(extrasTotal)}
                  </span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <span className="font-bold text-zinc-100 text-[1.6rem]">Total Due</span>
                <span className="font-extrabold text-[2.4rem] text-amber-400 tabular-nums">
                  {formatCurrency(totalReservationPrice)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isCreating || !selectedCabin}
              className="w-full py-4 rounded-xl font-bold text-[1.5rem] bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 shadow-lg shadow-amber-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
            >
              {isCreating ? "Confirming Reservation..." : "Confirm & Save Reservation"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NewBooking;
