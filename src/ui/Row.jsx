function Row({ children, type = "vertical", className = "" }) {
  return (
    <div
      className={`flex ${
        type === "horizontal"
          ? "justify-between items-center"
          : "flex-col gap-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default Row;
