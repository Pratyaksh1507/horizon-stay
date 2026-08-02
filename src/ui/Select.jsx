function Select({ options, value, onChange, ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="text-[1.35rem] px-3 py-2 border border-zinc-700 bg-zinc-800 rounded-lg font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all duration-200"
      {...props}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
