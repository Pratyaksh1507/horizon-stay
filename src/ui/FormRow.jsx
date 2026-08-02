function FormRow({ label, error, children }) {
  return (
    <div className="grid items-center grid-cols-[24rem_1fr_1.2fr] gap-6 py-3 first:pt-0 last:pb-0 not-last:border-b border-zinc-800 has-[button]:flex has-[button]:justify-end has-[button]:gap-3">
      {label && (
        <label
          htmlFor={children.props?.id}
          className="font-medium text-zinc-300"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.35rem] text-red-400">{error}</span>}
    </div>
  );
}

export default FormRow;
