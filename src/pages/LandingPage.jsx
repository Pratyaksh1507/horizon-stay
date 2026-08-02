import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineCalendarDays,
  HiOutlineChartBar,
  HiOutlineHomeModern,
  HiOutlineLockClosed,
  HiOutlineMoon,
  HiOutlineUsers,
} from "react-icons/hi2";

const FEATURES = [
  { icon: HiOutlineCalendarDays, label: "Booking management" },
  { icon: HiOutlineHomeModern, label: "Cabin CRUD" },
  { icon: HiOutlineChartBar, label: "Revenue analytics" },
  { icon: HiOutlineUsers, label: "Guest tracking" },
  { icon: HiOutlineLockClosed, label: "Auth & protected routes" },
  { icon: HiOutlineMoon, label: "Dark / Light mode" },
];

const TECH = [
  "React 18", "React Router v6", "Supabase", "React Query",
  "Tailwind CSS", "Recharts", "React Hook Form", "Vite",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

function LandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1033] to-[#0d1a2e] text-zinc-200 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex justify-between items-center px-16 py-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/horizon-stay-logo.png" alt="Horizon Stay" className="w-9 h-9 object-contain rounded-lg" />
          <span className="text-[1.8rem] font-bold tracking-wider bg-gradient-to-r from-[#818cf8] to-[#c4b5fd] bg-clip-text text-transparent">
            HORIZON STAY
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Pratyaksh1507/horizon-stay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white text-[1.35rem] no-underline transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </nav>

      <motion.section
        className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block bg-brand-500/15 border border-brand-500/40 text-[#a5b4fc] text-[1.15rem] font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
        >
          Hotel Management SaaS • Full Stack
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-[clamp(3.6rem,7vw,7.2rem)] font-extrabold leading-[1.1] mb-5 tracking-tight bg-gradient-to-br from-white via-white to-[#a5b4fc] bg-clip-text text-transparent"
        >
          The modern dashboard
          <br />
          for boutique hotels.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-[1.7rem] text-zinc-400 max-w-[56rem] leading-relaxed mb-10"
        >
          A production-grade hotel management system built with React, Supabase,
          and React Query. Manage bookings, cabins, and analytics — all in one place.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-wrap gap-3 justify-center mb-14"
        >
          {FEATURES.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-[1.35rem] text-zinc-300"
            >
              <Icon className="w-4 h-4 text-[#818cf8]" />
              {label}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm max-w-[42rem] w-full mb-8"
        >
          <h3 className="text-[1.35rem] font-semibold uppercase tracking-widest text-[#818cf8] mb-4">
            🔑 Demo Access
          </h3>
          <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-b-0">
            <span className="text-[1.25rem] text-zinc-400">Email</span>
            <span className="text-[1.35rem] font-mono font-medium text-zinc-200 bg-brand-500/10 px-3 py-1 rounded-md border border-brand-500/20">
              demo@horizonstay.com
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-b-0">
            <span className="text-[1.25rem] text-zinc-400">Password</span>
            <span className="text-[1.35rem] font-mono font-medium text-zinc-200 bg-brand-500/10 px-3 py-1 rounded-md border border-brand-500/20">
              demo1234
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] text-white text-[1.5rem] font-semibold px-8 py-3.5 rounded-xl no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)]"
          >
            Enter Dashboard →
          </Link>
        </motion.div>
      </motion.section>

      <section className="text-center px-8 py-10 border-t border-white/5">
        <p className="text-[1.15rem] uppercase tracking-widest text-zinc-500 mb-5">
          Built With
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {TECH.map((t) => (
            <span
              key={t}
              className="text-[1.15rem] font-medium px-3 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

export default LandingPage;
