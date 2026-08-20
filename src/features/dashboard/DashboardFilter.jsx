import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      layoutId="dashboardTimeframe"
      options={[
        { value: "7", label: "7 Days" },
        { value: "30", label: "30 Days" },
        { value: "90", label: "90 Days" },
      ]}
    />
  );
}

export default DashboardFilter;
