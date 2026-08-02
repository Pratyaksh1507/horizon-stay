function Textarea({ ...props }) {
  return (
    <textarea
      className="px-3 py-2 border border-zinc-700 bg-zinc-800 rounded-lg w-full h-32 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
      {...props}
    />
  );
}

export default Textarea;
