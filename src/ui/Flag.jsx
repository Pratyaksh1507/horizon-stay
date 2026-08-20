export function Flag({ src, alt }) {
  if (!src) return <span className="text-[1.4rem]">🌍</span>;

  const isUrl =
    typeof src === "string" &&
    (src.startsWith("http") || src.startsWith("/") || src.includes("."));

  if (isUrl) {
    return (
      <img
        src={src}
        alt={alt || "Flag"}
        className="w-5 h-3.5 object-cover rounded-sm block border border-zinc-700/60 shadow-xs"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    );
  }

  return <span className="text-[1.4rem] leading-none select-none">{src}</span>;
}
