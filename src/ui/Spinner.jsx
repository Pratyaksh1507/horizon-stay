function Spinner({ size = "md", className = "" }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <div className="relative">
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-zinc-800 border-t-amber-500 animate-spin`}
        />
        <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-sm pointer-events-none animate-pulse" />
      </div>
    </div>
  );
}

export default Spinner;
