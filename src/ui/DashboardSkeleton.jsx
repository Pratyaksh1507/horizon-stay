function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
        <div className="flex flex-col gap-2.5">
          <div className="h-8 w-72 bg-zinc-800 rounded-xl" />
          <div className="h-4 w-96 bg-zinc-850 rounded-lg" />
        </div>
        <div className="h-10 w-48 bg-zinc-800 rounded-xl" />
      </div>

      {/* 2. Stats 4 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-4 h-28"
          >
            <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex-shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3.5 w-20 bg-zinc-800 rounded-md" />
              <div className="h-6 w-28 bg-zinc-800 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Middle Row: Sales + Today */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 h-96 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4">
          <div className="h-6 w-48 bg-zinc-800 rounded-md" />
          <div className="flex-1 bg-zinc-950/40 rounded-xl border border-zinc-850/50" />
        </div>
        <div className="lg:col-span-4 h-96 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4">
          <div className="h-6 w-36 bg-zinc-800 rounded-md" />
          <div className="flex-1 bg-zinc-950/40 rounded-xl border border-zinc-850/50" />
        </div>
      </div>

      {/* 4. Operations Row: Donut + Occupancy */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 h-96 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4">
          <div className="h-6 w-40 bg-zinc-800 rounded-md" />
          <div className="flex-1 bg-zinc-950/40 rounded-xl border border-zinc-850/50" />
        </div>
        <div className="lg:col-span-8 h-96 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4">
          <div className="h-6 w-48 bg-zinc-800 rounded-md" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
              <div key={k} className="bg-zinc-950/40 rounded-xl border border-zinc-850/50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
