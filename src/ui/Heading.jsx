function Heading({ children, as = "h1", className = "" }) {
  const sizes = {
    h1: "text-[2.8rem] font-semibold",
    h2: "text-[2rem] font-semibold",
    h3: "text-[2rem] font-medium",
  };

  return (
    <h1 className={`${sizes[as] || sizes.h1} text-zinc-100 leading-relaxed ${className}`}>
      {children}
    </h1>
  );
}

export default Heading;
