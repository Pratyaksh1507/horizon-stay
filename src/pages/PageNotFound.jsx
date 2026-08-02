import { motion } from "framer-motion";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <motion.main
      className="h-screen bg-zinc-950 flex items-center justify-center p-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center max-w-[96rem]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h1 className="text-[2rem] font-bold text-zinc-100 mb-8">
          The page you are looking for could not be found
        </h1>
        <motion.button
          onClick={moveBack}
          className="px-6 py-3 text-[1.4rem] font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 rounded-lg hover:bg-zinc-700 hover:text-zinc-100 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          &larr; Go back
        </motion.button>
      </motion.div>
    </motion.main>
  );
}

export default PageNotFound;
