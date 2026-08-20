import { useState } from "react";
import { Bed, Calendar, Check, ShieldCheck, Users, Utensils } from "lucide-react";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength = 1,
      maxBookingLength = 90,
      maxGuestsPerBooking = 10,
      breakfastPrice = 15,
    } = {},
  } = useSettings();

  const { isUpdating, updateSetting } = useUpdateSetting();
  const [lastSavedField, setLastSavedField] = useState(null);

  if (isLoading) return <Spinner />;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    updateSetting(
      { [field]: Number(value) },
      {
        onSuccess: () => {
          setLastSavedField(field);
          setTimeout(() => setLastSavedField(null), 2500);
        },
      }
    );
  }

  const CARDS = [
    {
      id: "minBookingLength",
      field: "minBookingLength",
      label: "Minimum Reservation Length",
      unit: "nights",
      defaultValue: minBookingLength,
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
      description: "Minimum nights required for a confirmed guest reservation.",
    },
    {
      id: "maxBookingLength",
      field: "maxBookingLength",
      label: "Maximum Reservation Length",
      unit: "nights",
      defaultValue: maxBookingLength,
      icon: <Bed className="w-5 h-5 text-sky-400" />,
      description: "Maximum allowable length of stay for any single booking.",
    },
    {
      id: "maxGuestsPerBooking",
      field: "maxGuestsPerBooking",
      label: "Maximum Guests Per Booking",
      unit: "guests",
      defaultValue: maxGuestsPerBooking,
      icon: <Users className="w-5 h-5 text-emerald-400" />,
      description: "Total occupant limit allowed per chalet reservation.",
    },
    {
      id: "breakfastPrice",
      field: "breakfastPrice",
      label: "Resort Breakfast Rate",
      unit: "$ / guest / night",
      defaultValue: breakfastPrice,
      icon: <Utensils className="w-5 h-5 text-amber-400" />,
      description: "Daily breakfast buffet charge applied to reservations.",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Live Sync Banner */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-[1.25rem] text-zinc-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Real-time Configuration Active</span>
          <span className="text-zinc-600">&bull;</span>
          <span className="text-zinc-500">Changes save automatically on input blur</span>
        </div>
        {isUpdating && <span className="text-amber-400 animate-pulse font-medium">Syncing changes...</span>}
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CARDS.map((card) => (
          <div
            key={card.id}
            className="p-6 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700/80 transition-all flex flex-col justify-between gap-4 shadow-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-[1.55rem] font-bold text-zinc-100">{card.label}</h4>
                  <p className="text-[1.2rem] text-zinc-400 mt-0.5">{card.description}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-800/80">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id={card.id}
                  defaultValue={card.defaultValue}
                  disabled={isUpdating}
                  onBlur={(e) => handleUpdate(e, card.field)}
                  className="w-32 px-4 py-2.5 text-[1.6rem] font-bold text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors tabular-nums"
                />
                <span className="text-[1.3rem] text-zinc-400 font-medium">{card.unit}</span>
              </div>

              {lastSavedField === card.field && (
                <span className="flex items-center gap-1 text-[1.15rem] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <Check className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpdateSettingsForm;
