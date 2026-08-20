import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow.jsx";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length)
    return (
      <p className="text-[1.5rem] font-medium text-center my-6 text-zinc-500">
        No cabins available at the moment.
      </p>
    );

  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = [...filteredCabins].sort((a, b) => {
    if (typeof a[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    }
    return (Number(a[field] || 0) - Number(b[field] || 0)) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.8fr 1.6fr 1.8fr 1.6fr 1.2fr 3.2rem">
        <Table.Header>
          <div>Preview</div>
          <div>Unit Name</div>
          <div>Capacity</div>
          <div>Nightly Rate</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
