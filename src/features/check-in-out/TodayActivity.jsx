import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, CheckCircle2, UserCheck, Calendar } from "lucide-react";
import { getStaysTodayActivity } from "../../services/apiBookings";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { activities: activities || [], isLoading };
}

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  const [activeTab, setActiveTab] = useState("all"); // "all" | "arriving" | "departing"

  const arriving = useMemo(
    () => activities.filter((a) => a.status === "unconfirmed"),
    [activities]
  );
  const departing = useMemo(
    () => activities.filter((a) => a.status === "checked-in"),
    [activities]
  );

  const displayedActivities = useMemo(() => {
    if (activeTab === "arriving") return arriving;
    if (activeTab === "departing") return departing;
    return activities;
  }, [activeTab, activities, arriving, departing]);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/90 rounded-2xl p-6 flex flex-col gap-5 h-full shadow-xl relative overflow-hidden">
      {/* Header with Title and Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
            Front Desk Today
          </h3>
          <span className="text-[1.2rem] font-semibold text-zinc-400 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700/60">
            {activities.length}
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 bg-zinc-950/70 border border-zinc-800 rounded-xl self-start sm:self-auto text-[1.2rem]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeTab === "all"
                ? "bg-zinc-800 text-zinc-100 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            All ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab("arriving")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeTab === "arriving"
                ? "bg-zinc-800 text-emerald-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Arriving ({arriving.length})
          </button>
          <button
            onClick={() => setActiveTab("departing")}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
              activeTab === "departing"
                ? "bg-zinc-800 text-sky-400 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Departing ({departing.length})
          </button>
        </div>
      </div>

      {/* Activity List */}
      {!isLoading ? (
        displayedActivities.length > 0 ? (
          <ul className="overflow-y-auto flex flex-col gap-2.5 max-h-[360px] pr-1 scrollbar-none [mask-image:linear-gradient(to_bottom,white_calc(100%-20px),transparent_100%)] pb-4">
            <AnimatePresence mode="popLayout">
              {displayedActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <TodayItem activity={activity} />
                </motion.div>
              ))}
            </AnimatePresence>
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 py-12 px-4 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-950/30">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-[1.5rem] font-semibold text-zinc-200">
              Front Desk Clear
            </p>
            <p className="text-[1.25rem] text-zinc-500 max-w-[280px] mt-1">
              {activeTab === "arriving"
                ? "No pending guest arrivals scheduled for today."
                : activeTab === "departing"
                ? "No guest departures scheduled for today."
                : "No check-in or checkout operations scheduled for today."}
            </p>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center flex-1 py-12">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default TodayActivity;
