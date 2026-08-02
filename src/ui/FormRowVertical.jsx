function FormRowVertical({ label, error, children }) {
  return (
    <div className="flex flex-col gap-2 not-last:mb-4">
      {label && (
        <label
          htmlFor={children.props?.id}
          className="font-medium text-zinc-300"
        >
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.15rem] text-red-400">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
