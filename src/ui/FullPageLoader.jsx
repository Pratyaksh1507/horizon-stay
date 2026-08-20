import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function FullPageLoader() {
  return (
    <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center z-50">
      <motion.div
        className="flex flex-col items-center gap-5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glowing Logo / Pulse */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-2xl shadow-amber-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div className="absolute -inset-2 bg-amber-500/20 rounded-3xl blur-xl animate-pulse pointer-events-none" />
        </div>

        {/* Text & Spinner */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-[1.8rem] font-bold text-zinc-100 tracking-tight">
            Horizon Stay
          </h3>
          <div className="flex items-center gap-2 text-[1.2rem] text-zinc-400 font-medium">
            <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-700 border-t-amber-400 animate-spin" />
            <span>Initializing luxury portal...</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default FullPageLoader;
