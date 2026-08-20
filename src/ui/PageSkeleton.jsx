function PageSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse w-full max-w-[140rem] mx-auto">
      {/* Header skeleton */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-64 bg-zinc-800/80 rounded-xl" />
          <div className="h-4 w-96 bg-zinc-850/60 rounded-lg" />
        </div>
        <div className="h-10 w-40 bg-zinc-800/80 rounded-xl" />
      </div>

      {/* Content skeleton cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-36 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-zinc-800 rounded-md" />
              <div className="w-9 h-9 bg-zinc-800 rounded-xl" />
            </div>
            <div className="h-8 w-32 bg-zinc-800 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Main card skeleton */}
      <div className="h-96 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col gap-4">
        <div className="h-6 w-48 bg-zinc-800 rounded-md" />
        <div className="flex-1 rounded-xl bg-zinc-950/40 border border-zinc-800/50" />
      </div>
    </div>
  );
}

export default PageSkeleton;
