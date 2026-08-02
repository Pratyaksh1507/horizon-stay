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
      <p className="text-[1.35rem] ml-2 text-zinc-400">
        Showing <span className="font-semibold text-zinc-200">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span className="font-semibold text-zinc-200">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold text-zinc-200">{count}</span> results
      </p>
      <div className="flex gap-2">
        <motion.button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-[1.35rem] bg-zinc-800 text-zinc-300 hover:bg-brand-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: currentPage === 1 ? 1 : 1.02 }}
          whileTap={{ scale: currentPage === 1 ? 1 : 0.98 }}
        >
          <HiChevronLeft className="w-5 h-5" />
          <span>Previous</span>
        </motion.button>
        <motion.button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-[1.35rem] bg-zinc-800 text-zinc-300 hover:bg-brand-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: currentPage === pageCount ? 1 : 1.02 }}
          whileTap={{ scale: currentPage === pageCount ? 1 : 0.98 }}
        >
          <span>Next</span>
          <HiChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default Pagination;
