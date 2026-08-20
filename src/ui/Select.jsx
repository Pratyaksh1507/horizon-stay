function Select({ options, value, onChange, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="text-[1.3rem] px-3.5 py-2 border border-zinc-800 bg-zinc-900/90 text-zinc-100 rounded-xl font-medium shadow-sm focus:outline-none focus:border-amber-500 transition-all cursor-pointer"
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value} className="bg-zinc-950 text-zinc-100">
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
