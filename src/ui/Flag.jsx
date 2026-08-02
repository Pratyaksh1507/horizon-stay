export function Flag({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-[2rem] rounded-sm block border border-zinc-800"
    />
  );
}
