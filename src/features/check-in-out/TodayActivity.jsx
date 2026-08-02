import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";
import TodayItem from "./TodayItem";
import Spinner from "../../ui/Spinner";

function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity,
  });
  return { activities, isLoading };
}

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-5 h-full">
      <h3 className="text-[1.6rem] font-semibold text-zinc-100">Today</h3>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="overflow-y-auto flex flex-col gap-1 flex-1 [&::-webkit-scrollbar]:w-0 scrollbar-none [mask-image:linear-gradient(to_bottom,white_calc(100%-40px),transparent_100%)] pb-4">
            {activities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-[1.6rem] font-medium text-zinc-500 mt-2">
            No activity today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
