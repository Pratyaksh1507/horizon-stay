function Form({ children, type = "regular", onSubmit, ...props }) {
  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden text-[1.35rem] ${
        type === "regular"
          ? "p-6 bg-zinc-900 border border-zinc-800 rounded-xl"
          : type === "modal"
          ? "w-[80rem]"
          : ""
      }`}
      {...props}
    >
      {children}
    </form>
  );
}

export default Form;
