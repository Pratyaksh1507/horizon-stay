import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-zinc-800/90 text-[1.35rem] bg-zinc-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl"
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
      className="grid items-center py-4 px-6 bg-zinc-950/80 border-b border-zinc-800/90 uppercase tracking-wider font-bold text-zinc-400 text-[1.15rem]"
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
      className="grid items-center py-3.5 px-6 border-b border-zinc-800/60 last:border-b-0 hover:bg-zinc-800/40 transition-colors duration-150"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}

function Body({ data = [], render }) {
  if (!data.length)
    return (
      <div className="py-12 text-center text-zinc-500 text-[1.4rem]">
        No records found matching current criteria.
      </div>
    );
  return <section className="divide-y divide-zinc-800/60">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="bg-zinc-950/60 border-t border-zinc-800/80 p-4 flex justify-center empty:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
