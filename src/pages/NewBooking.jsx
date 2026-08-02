import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../services/apiCabins";
import supabase from "../services/supabase";
import toast from "react-hot-toast";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus",
  "Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil",
  "Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada",
  "Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic",
  "East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini",
  "Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece",
  "Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary",
  "Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica",
  "Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
  "Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania",
  "Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco",
  "Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal",
  "Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia",
  "Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
  "Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
  "Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
  "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
  "Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda",
  "Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

function NewBooking() {
  const queryClient = useQueryClient();
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const { data: cabins = [], isLoading: cabinsLoading } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: async (data) => {
      const { data: existingGuest } = await supabase
        .from("guests")
        .select("id")
        .eq("email", data.guestEmail)
        .single();

      let guestId;
      if (existingGuest) {
        guestId = existingGuest.id;
      } else {
        const { data: newGuest, error: guestError } = await supabase
          .from("guests")
          .insert([
            {
              fullName: data.guestName,
              email: data.guestEmail,
              nationality: data.nationality || "Unknown",
            },
          ])
          .select()
          .single();

        if (guestError) throw new Error(guestError.message);
        guestId = newGuest.id;
      }

      const cabin = cabins.find((c) => c.id === Number(data.cabinId));
      const numNights =
        checkIn && checkOut
          ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) || 1
          : 1;
      const cabinPrice = (cabin?.regularPrice || 0) * numNights;

      const { error } = await supabase.from("bookings").insert([
        {
          startDate: checkIn?.toISOString(),
          endDate: checkOut?.toISOString(),
          numNights,
          numGuests: Number(data.numGuests) || 1,
          cabinPrice,
          totalPrice: cabinPrice,
          extrasPrice: 0,
          status: "unconfirmed",
          hasBreakfast: false,
          isPaid: false,
          observations: data.observations || "",
          cabinId: Number(data.cabinId),
          guestId,
        },
      ]);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      toast.success("Booking created successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const inputClass = "px-4 py-2.5 text-[1.45rem] text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 h-11";
  const selectClass = "px-4 py-2.5 text-[1.45rem] text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 h-11 cursor-pointer";
  const textareaClass = "px-4 py-2.5 text-[1.45rem] text-zinc-200 bg-zinc-800 border border-zinc-700 rounded-lg outline-none transition-all duration-200 focus:border-brand-500 resize-vertical min-h-[8rem]";
  const labelClass = "text-[1.25rem] font-semibold text-zinc-500 uppercase tracking-[0.06em]";
  const errorClass = "text-[1.15rem] text-red-400";
  const fieldClass = "flex flex-col gap-2";

  return (
    <>
      <style>{`
        .react-datepicker {
          font-family: "Inter", sans-serif;
          background: #18181b !important;
          border: 1px solid #3f3f46 !important;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.4);
          overflow: hidden;
        }
        .react-datepicker__header {
          background: #18181b !important;
          border-bottom: 1px solid #3f3f46 !important;
          padding-top: 1.2rem;
        }
        .react-datepicker__current-month {
          color: #f4f4f5 !important;
          font-weight: 600;
          font-size: 1.5rem;
          margin-bottom: 0.6rem;
        }
        .react-datepicker__day-name {
          color: #71717a !important;
          font-weight: 600;
          font-size: 1.2rem;
          width: 3.6rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .react-datepicker__day {
          color: #d4d4d8 !important;
          font-size: 1.4rem;
          width: 3.6rem;
          height: 3.6rem;
          line-height: 3.6rem;
          border-radius: 8px;
          margin: 0.2rem;
          transition: all 0.15s;
        }
        .react-datepicker__day:hover {
          background: rgba(59,130,246,0.15) !important;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background: #2563eb !important;
          color: white !important;
          font-weight: 600;
        }
        .react-datepicker__day--today {
          border: 1.5px solid #3b82f6;
          font-weight: 600;
          color: #60a5fa !important;
        }
        .react-datepicker__day--disabled {
          color: #52525b !important;
          cursor: not-allowed;
        }
        .react-datepicker__day--outside-month {
          opacity: 0.4;
        }
        .react-datepicker__navigation-icon::before {
          border-color: #71717a !important;
          border-width: 2px 2px 0 0;
          height: 8px;
          width: 8px;
        }
        .react-datepicker__navigation:hover *::before {
          border-color: #3b82f6 !important;
        }
        .react-datepicker__triangle { display: none; }
        .react-datepicker__month { margin: 0.8rem; }
        .react-datepicker-popper { z-index: 100; }
      `}</style>

      <Row type="horizontal">
        <Heading as="h1">New Booking</Heading>
      </Row>

      <form
        onSubmit={handleSubmit(createBooking)}
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col gap-6 max-w-[80rem]"
      >
        <Heading as="h3">Guest Details</Heading>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className={fieldClass}>
            <label className={labelClass}>Full Name</label>
            <input
              {...register("guestName", { required: "Guest name is required" })}
              placeholder="John Doe"
              className={inputClass}
            />
            {errors.guestName && <span className={errorClass}>{errors.guestName.message}</span>}
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("guestEmail", { required: "Email is required" })}
              placeholder="guest@email.com"
              className={inputClass}
            />
            {errors.guestEmail && <span className={errorClass}>{errors.guestEmail.message}</span>}
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Nationality</label>
            <select {...register("nationality")} className={selectClass}>
              <option value="">Select country&hellip;</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Number of Guests</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              {...register("numGuests")}
              className={inputClass}
            />
          </div>
        </div>

        <Heading as="h3">Stay Details</Heading>
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          <div className={fieldClass}>
            <label className={labelClass}>Cabin</label>
            <select
              {...register("cabinId", { required: "Please select a cabin" })}
              disabled={cabinsLoading}
              className={selectClass}
            >
              <option value="">Select a cabin&hellip;</option>
              {cabins.map((cabin) => (
                <option key={cabin.id} value={cabin.id}>
                  {cabin.name} &mdash; ${cabin.regularPrice}/night (max {cabin.maxCapacity})
                </option>
              ))}
            </select>
            {errors.cabinId && <span className={errorClass}>{errors.cabinId.message}</span>}
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Check-in Date</label>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setCheckIn(date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={new Date()}
              placeholderText="Select check-in"
              dateFormat="MMM dd, yyyy"
              customInput={<input readOnly className={`${inputClass} cursor-pointer`} />}
            />
          </div>
          <div className={fieldClass}>
            <label className={labelClass}>Check-out Date</label>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setCheckOut(date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={checkIn || new Date()}
              placeholderText="Select check-out"
              dateFormat="MMM dd, yyyy"
              customInput={<input readOnly className={`${inputClass} cursor-pointer`} />}
            />
          </div>
        </div>

        <div className={fieldClass}>
          <label className={labelClass}>Observations</label>
          <textarea
            {...register("observations")}
            placeholder="Any special requests&hellip;"
            className={textareaClass}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="self-start px-8 py-3 text-[1.45rem] font-semibold text-white bg-brand-600 rounded-lg cursor-pointer transition-all duration-200 hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Creating\u2026" : "Create Booking"}
        </button>
      </form>
    </>
  );
}

export default NewBooking;
