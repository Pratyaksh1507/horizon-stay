import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-zinc-800 text-[1.35rem] bg-zinc-900 rounded-xl overflow-hidden"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className="grid items-center py-4 px-6 bg-zinc-800/50 border-b border-zinc-800 uppercase tracking-wide font-semibold text-zinc-400 text-[1.15rem]"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className="grid items-center py-3 px-6 not-last:border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors duration-150"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data = [], render }) {
  if (!data.length)
    return (
      <p className="text-[1.5rem] font-medium text-center my-6 text-zinc-500">
        No data to show at the moment
      </p>
    );
  return <section className="my-1">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="bg-zinc-800/40 p-3 flex justify-center empty:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
