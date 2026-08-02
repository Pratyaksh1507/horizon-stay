function DashboardBox({ children }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex flex-col gap-6">
      {children}
    </div>
  );
}

export default DashboardBox;
