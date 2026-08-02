function Input({ ...props }) {
  return (
    <input
      className="border border-zinc-700 bg-zinc-800 rounded-lg px-3 py-2 text-[1.35rem] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
      {...props}
    />
  );
}

export default Input;
