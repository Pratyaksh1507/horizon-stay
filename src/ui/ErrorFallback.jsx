import { motion } from "framer-motion";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="h-screen bg-zinc-950 flex items-center justify-center p-12">
      <motion.div
        className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 flex-[0_1_96rem] text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[2.4rem] font-semibold text-zinc-100 mb-4">
          Something went wrong
        </h1>
        <p className="font-mono text-zinc-400 mb-8">
          {error.message}
        </p>
        <button
          onClick={resetErrorBoundary}
          className="px-6 py-3 bg-brand-600 text-white font-medium rounded-lg hover:bg-brand-500 transition-colors"
        >
          Try again
        </button>
      </motion.div>
    </main>
  );
}

export default ErrorFallback;
