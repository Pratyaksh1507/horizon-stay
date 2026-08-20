import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";
import { motion } from "framer-motion";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[1.3rem] ml-1 text-zinc-400">
        Showing <span className="font-bold text-zinc-200">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span className="font-bold text-zinc-200">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-bold text-amber-400">{count}</span> records
      </p>
      <div className="flex gap-2">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-semibold text-[1.3rem] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          whileHover={{ scale: currentPage === 1 ? 1 : 1.02 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.98 }}
        >
          <HiChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </motion.button>
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl font-semibold text-[1.3rem] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-amber-500 hover:text-zinc-950 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          whileHover={{ scale: currentPage === pageCount ? 1 : 1.02 }}
          whileTap={{ scale: currentPage === pageCount ? 1 : 0.98 }}
        >
          <span>Next</span>
          <HiChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}

export default Pagination;
